import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { useUpdateTodo, useDeleteTodo } from '../convex/hooks';
import { ThemeContext } from './ThemeProvider';

const ItemContainer = styled.TouchableOpacity<{ theme: any; isActive: boolean }>`
  padding: 16px;
  background-color: ${({ theme, isActive }) => isActive ? theme.cardHover : theme.card};
  border-radius: 12px;
  margin-vertical: 6px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  shadow-color: ${({ theme }) => theme.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 2;
`;

const ItemContent = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
`;

const Checkbox = styled.View<{ theme: any; checked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${({ theme, checked }) => checked ? theme.success : theme.border};
  background-color: ${({ theme, checked }) => checked ? theme.success : 'transparent'};
  justify-content: center;
  align-items: center;
  margin-top: 2px;
`;

const Checkmark = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const TextContainer = styled.View`
  flex: 1;
  gap: 4px;
`;

const Title = styled.Text<{ theme: any; completed: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme, completed }) => completed ? theme.completed : theme.text};
  text-decoration-line: ${({ completed }) => completed ? 'line-through' : 'none'};
`;

const Description = styled.Text<{ theme: any }>`
  font-size: 14px;
  color: ${({ theme }) => theme.subText};
  margin-top: 4px;
`;

const DueDateContainer = styled.View<{ theme: any }>`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 6px;
  align-self: flex-start;
`;

const DueDateText = styled.Text<{ theme: any; overdue: boolean }>`
  font-size: 12px;
  color: ${({ theme, overdue }) => overdue ? theme.danger : theme.subText};
  font-weight: 500;
`;

const SwipeDeleteButton = styled(RectButton)<{ theme: any }>`
  background-color: ${({ theme }) => theme.danger};
  justify-content: center;
  align-items: center;
  padding-horizontal: 24px;
  border-radius: 12px;
  margin-vertical: 6px;
`;

const DeleteText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

interface TodoItemProps {
  item: any;
  onLongPress: () => void;
  onPress?: () => void;
  isActive?: boolean;
}

export default function TodoItem({ item, onLongPress, onPress, isActive = false }: TodoItemProps) {
  const update = useUpdateTodo();
  const del = useDeleteTodo();
  const { theme } = useContext(ThemeContext);

  const toggleComplete = async () => {
    try {
      await update({ id: item._id, patch: { completed: !item.completed } });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await del({ id: item._id });
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const formatDueDate = (dueDate: string | null) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const due = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else if (diffDays <= 7) {
      return `Due in ${diffDays} days`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
    }
  };

  const dueDateText = formatDueDate(item.dueDate);
  const isOverdue = item.dueDate && new Date(item.dueDate) < new Date() && !item.completed;

  const renderRightActions = () => (
    <SwipeDeleteButton theme={theme} onPress={handleDelete}>
      <DeleteText>Delete</DeleteText>
    </SwipeDeleteButton>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <ItemContainer
        theme={theme}
        isActive={isActive}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`${item.title}${item.completed ? ', completed' : ''}`}
        accessibilityState={{ checked: item.completed }}
      >
        <ItemContent>
          <TouchableOpacity onPress={toggleComplete} accessibilityRole="checkbox" accessibilityState={{ checked: item.completed }}>
            <Checkbox theme={theme} checked={item.completed}>
              {item.completed && <Checkmark>✓</Checkmark>}
            </Checkbox>
          </TouchableOpacity>
          <TextContainer>
            <Title theme={theme} completed={item.completed}>
              {item.title}
            </Title>
            {item.description && (
              <Description theme={theme}>{item.description}</Description>
            )}
            {dueDateText && (
              <DueDateContainer theme={theme}>
                <DueDateText theme={theme} overdue={isOverdue}>
                  📅 {dueDateText}
                </DueDateText>
              </DueDateContainer>
            )}
          </TextContainer>
        </ItemContent>
      </ItemContainer>
    </Swipeable>
  );
}
