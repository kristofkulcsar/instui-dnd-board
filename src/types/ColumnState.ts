import { type Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';

export type ColumnState =
	| { type: 'idle' }
	| { type: 'is-card-over' }
	| { type: 'is-column-over'; closestEdge: Edge | null }
	| { type: 'generate-safari-column-preview'; container: HTMLElement }
	| { type: 'generate-column-preview' };