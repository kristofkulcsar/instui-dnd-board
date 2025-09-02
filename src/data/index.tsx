import { type ColumnMap } from "../types/ColumnMap";
import { type Item } from "../types/Item";

const navigationItems: Item[] = [
  { id: '0', label: 'Home' },
  { id: '1', label: 'Syllabus' },
  { id: '2', label: 'Pages' },
  { id: '3', label: 'Assignments' },
  { id: '4', label: 'Quizzes' },
  { id: '5', label: 'Grades' },
  { id: '6', label: 'People' },
  { id: '7', label: 'Groups' },
  { id: '8', label: 'Discussions' },
  { id: '10', label: 'Modules' },
  { id: '11', label: 'Files' },
  { id: '12', label: 'Conferences' },
  { id: '13', label: 'Settings' },
  { id: '14', label: 'Announcements' },
  { id: '15', label: 'Outcomes' },
  { id: '16', label: 'Collaborations' },
  { id: '17', label: 'Collaborations (New)' },
  { id: '18', label: 'Rubrics' },
  { id: '19', label: 'Schedule' },
  { id: '20', label: 'Course Paces' },
  { id: '21', label: 'Search' },
]

let sharedLookupIndex: number = 0;

export function getItem(): Item {
	sharedLookupIndex++;
	return getItemFromPosition({ position: sharedLookupIndex });
}

export function getItemFromPosition({ position }: { position: number }): Item {
	return navigationItems[position % navigationItems.length];
}

export function getItems({ amount }: { amount: number }): Item[] {
	return Array.from({ length: amount }, () => getItem());
}

export function getBasicData() {
	const columnMap: ColumnMap = {
		visibleInOrder: {
			title: 'Must be visible in order',
			columnId: 'visibleInOrder',
			items: getItems({ amount: 7 }),
		},
		visible: {
			title: 'Must be visible',
			columnId: 'visible',
			items: getItems({ amount: 7 }),
		},
		hidden: {
			title: 'Must be hidden',
			columnId: 'hidden',
			items: getItems({ amount: 7 }),
		},
	};

	const orderedColumnIds = ['visibleInOrder', 'visible', 'hidden'];

	return {
		columnMap,
		orderedColumnIds,
	};
}
