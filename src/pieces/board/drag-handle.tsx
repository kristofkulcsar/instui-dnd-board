import { useCallback } from "react";
import { IconButton, IconDragHandleSolid, Menu } from "@instructure/ui";

import { useBoardContext } from "./board-context";
import { useColumnContext } from "./column-context";

interface DragHandleProps {
  id: string;
  label: string;
  dragHandleTriggerRef: (button: Element | null) => void;
}
export default function DragHandle({ id, label, dragHandleTriggerRef }: DragHandleProps) {
  const { getColumns, reorderCard, moveCard } = useBoardContext();
  const { columnId, getCardIndex, getNumCards } = useColumnContext();
  
  const numCards = getNumCards();
  const startIndex = getCardIndex(id);

	const moveToTop = useCallback(() => {
		reorderCard({ columnId, startIndex, finishIndex: 0 });
	}, [columnId, reorderCard, startIndex]);

	const moveUp = useCallback(() => {
		reorderCard({ columnId, startIndex, finishIndex: startIndex - 1 });
	}, [columnId, reorderCard, startIndex]);

	const moveDown = useCallback(() => {
		reorderCard({ columnId, startIndex, finishIndex: startIndex + 1 });
	}, [columnId, reorderCard, startIndex]);

	const moveToBottom = useCallback(() => {
		reorderCard({ columnId, startIndex, finishIndex: numCards - 1 });
  }, [columnId, reorderCard, startIndex, numCards]);

  const moveToColumn = useCallback((targetColumnId: string) => {
    moveCard({
      startColumnId: columnId,
      finishColumnId: targetColumnId,
      itemIndexInStartColumn: startIndex,
    });
  }, [moveCard, columnId, startIndex]);

	const isMoveUpDisabled = startIndex === 0;
	const isMoveDownDisabled = startIndex === numCards - 1;

	const moveColumnOptions = getColumns().filter((column) => column.columnId !== columnId);
  
  return (
    <Menu trigger={
      <IconButton
        elementRef={dragHandleTriggerRef}
        screenReaderLabel={`Move ${label} navigation item`}
        cursor="grab"
        size="small"
        withBorder={false}
      >
        <IconDragHandleSolid />
      </IconButton>
    }>
      <Menu.Group label="Reorder">
        <Menu.Item onClick={moveToTop} disabled={isMoveUpDisabled}>Move to top</Menu.Item>
        <Menu.Item onClick={moveUp} disabled={isMoveUpDisabled}>Move up</Menu.Item>
        <Menu.Item onClick={moveDown} disabled={isMoveDownDisabled}>Move down</Menu.Item>
        <Menu.Item onClick={moveToBottom} disabled={isMoveDownDisabled}>Move to bottom</Menu.Item>
      </Menu.Group>
      <Menu.Separator />
      {moveColumnOptions.length && (
				<Menu.Group label="Move to">
					{moveColumnOptions.map((column) => (
            <Menu.Item 
              key={column.columnId} 
              onClick={() => moveToColumn(column.columnId)}
            >
              {column.title}
            </Menu.Item>
          ))}
				</Menu.Group>
			)}
    </Menu>
  );
}
