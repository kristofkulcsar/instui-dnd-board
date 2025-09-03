import {
	forwardRef,
	Fragment,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';

import ReactDOM from 'react-dom';
import invariant from 'tiny-invariant';

import { Text } from '@instructure/ui';

import {
	attachClosestEdge,
	type Edge,
	extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
	draggable,
	dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { preserveOffsetOnSource } from '@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { dropTargetForExternal } from '@atlaskit/pragmatic-drag-and-drop/external/adapter';
// eslint-disable-next-line @atlaskit/design-system/no-emotion-primitives -- to be migrated to @atlaskit/primitives/compiled – go/akcss
import { Box, Grid, Stack, xcss } from '@atlaskit/primitives';

import { type Item } from '../../types/Item';

import { useBoardContext } from './board-context';
import DragHandle from './drag-handle';

type State =
	| { type: 'idle' }
	| { type: 'preview'; container: HTMLElement; rect: DOMRect }
	| { type: 'dragging' };

const idleState: State = { type: 'idle' };
const draggingState: State = { type: 'dragging' };

const baseStyles = xcss({
	width: '100%',
	padding: 'space.100',
	backgroundColor: 'elevation.surface',
	borderRadius: 'border.radius.200',
	position: 'relative',
	':hover': {
		backgroundColor: 'elevation.surface.hovered',
	},
});

const stateStyles: {
	[Key in State['type']]: ReturnType<typeof xcss> | undefined;
} = {
	idle: xcss({
		cursor: 'grab',
		boxShadow: 'elevation.shadow.raised',
	}),
	dragging: xcss({
		opacity: 0.4,
		boxShadow: 'elevation.shadow.raised',
	}),
	// no shadow for preview - the platform will add it's own drop shadow
	preview: undefined,
};

const buttonColumnStyles = xcss({
	alignSelf: 'start',
});

type CardPrimitiveProps = {
	closestEdge: Edge | null;
	item: Item;
	state: State;
	actionMenuTriggerRef: (button: Element | null) => void;
};

const CardPrimitive = forwardRef<HTMLDivElement, CardPrimitiveProps>(function CardPrimitive(
	{ closestEdge, item, state, actionMenuTriggerRef },
	ref,
) {
	const { id, label } = item;

	return (
		<Grid
			ref={ref}
			testId={`item-${id}`}
			templateColumns="auto 1fr auto"
			columnGap="space.100"
			alignItems="center"
			xcss={[baseStyles, stateStyles[state.type]]}
		>
			<Box xcss={buttonColumnStyles}>
				<DragHandle {...item} dragHandleTriggerRef={actionMenuTriggerRef} />
			</Box>
			<Stack space="space.050" grow="fill">
				<Text variant="content">{label}</Text>
			</Stack>
			{closestEdge && <DropIndicator edge={closestEdge} gap={'8px'} />}
		</Grid>
	);
});

export const Card = memo(function Card({ item }: { item: Item }) {
	const ref = useRef<HTMLDivElement | null>(null);
	const { id } = item;
	const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
	const [state, setState] = useState<State>(idleState);

	const actionMenuTriggerRef = useRef<Element | null>(null);

	const setActionMenuTrigger = useCallback((button: Element | null) => {
		actionMenuTriggerRef.current = button;
	}, []);

	const { instanceId, registerCard } = useBoardContext();
	useEffect(() => {
		invariant(actionMenuTriggerRef.current);
		invariant(ref.current);
		
		return registerCard({
			cardId: id,
			entry: {
				element: ref.current,
				actionMenuTrigger: actionMenuTriggerRef.current as HTMLElement,
			},
		});
	}, [registerCard, id]);

	useEffect(() => {
		const element = ref.current;
		invariant(element);
		return combine(
			draggable({
				element: element,
				getInitialData: () => ({ type: 'card', itemId: id, instanceId }),
				onGenerateDragPreview: ({ location, source, nativeSetDragImage }) => {
					const rect = source.element.getBoundingClientRect();

					setCustomNativeDragPreview({
						nativeSetDragImage,
						getOffset: preserveOffsetOnSource({
							element,
							input: location.current.input,
						}),
						render({ container }) {
							setState({ type: 'preview', container, rect });
							return () => setState(draggingState);
						},
					});
				},

				onDragStart: () => setState(draggingState),
				onDrop: () => setState(idleState),
			}),
			dropTargetForExternal({
				element: element,
			}),
			dropTargetForElements({
				element: element,
				canDrop: ({ source }) => {
					return source.data.instanceId === instanceId && source.data.type === 'card';
				},
				getIsSticky: () => true,
				getData: ({ input, element }) => {
					const data = { type: 'card', itemId: id };

					return attachClosestEdge(data, {
						input,
						element,
						allowedEdges: ['top', 'bottom'],
					});
				},
				onDragEnter: (args) => {
					if (args.source.data.itemId !== id) {
						setClosestEdge(extractClosestEdge(args.self.data));
					}
				},
				onDrag: (args) => {
					if (args.source.data.itemId !== id) {
						setClosestEdge(extractClosestEdge(args.self.data));
					}
				},
				onDragLeave: () => {
					setClosestEdge(null);
				},
				onDrop: () => {
					setClosestEdge(null);
				},
			}),
		);
	}, [instanceId, item, id]);

	return (
		<Fragment>
			<CardPrimitive
				ref={ref}
				item={item}
				state={state}
				closestEdge={closestEdge}
				actionMenuTriggerRef={setActionMenuTrigger}
			/>
			{state.type === 'preview' &&
				ReactDOM.createPortal(
					<Box
						style={{
							/**
							 * Ensuring the preview has the same dimensions as the original.
							 *
							 * Using `border-box` sizing here is not necessary in this
							 * specific example, but it is safer to include generally.
							 */
							// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
							boxSizing: 'border-box',
							width: state.rect.width,
							height: state.rect.height,
						}}
					>
						<CardPrimitive item={item} state={state} closestEdge={null} actionMenuTriggerRef={setActionMenuTrigger} />
					</Box>,
					state.container,
				)}
		</Fragment>
	);
});
