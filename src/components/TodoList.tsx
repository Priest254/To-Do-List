import React, { useContext, useMemo } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components/native';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { useTodos, useReorderTodos } from '../convex/hooks';
import TodoItem from './TodoItem';
import { ThemeContext } from './ThemeProvider';

const Container = styled.View<{ theme: any }>`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

const LoadingText = styled.Text<{ theme: any }>`
  margin-top: 12px;
  color: ${({ theme }) => theme.subText};
  font-size: 14px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const EmptyIcon = styled.Text`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.Text<{ theme: any }>`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
  text-align: center;
`;

const EmptyText = styled.Text<{ theme: any }>`
  font-size: 14px;
  color: ${({ theme }) => theme.subText};
  text-align: center;
  line-height: 20px;
`;

interface TodoListProps {
  searchQuery?: string;
  filter?: 'all' | 'active' | 'completed';
  onEdit?: (todo: any) => void;
}

export default function TodoList({ searchQuery = '', filter = 'all', onEdit }: TodoListProps) {
  const todos = useTodos();
  const reorder = useReorderTodos();
  const { theme } = useContext(ThemeContext);

  const filteredTodos = useMemo(() => {
    if (!todos) return [];
    
    let filtered = todos;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          (todo.description && todo.description.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (filter === 'active') {
      filtered = filtered.filter((todo) => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter((todo) => todo.completed);
    }

    return filtered;
  }, [todos, searchQuery, filter]);

  const handleDragEnd = async ({ data }: { data: any[] }) => {
    try {
      const payload = data.map((d, idx) => ({ id: d._id, order: idx }));
      await reorder({ items: payload });
    } catch (error) {
      console.error('Error reordering todos:', error);
    }
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => (
    <TodoItem 
      item={item} 
      onLongPress={drag} 
      onPress={onEdit ? () => onEdit(item) : undefined}
      isActive={isActive} 
    />
  );

  if (todos === undefined) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.primary} />
        <LoadingText theme={theme}>Loading todos...</LoadingText>
      </LoadingContainer>
    );
  }

  if (todos.length === 0) {
    return (
      <EmptyContainer>
        <EmptyIcon>📝</EmptyIcon>
        <EmptyTitle theme={theme}>No todos yet</EmptyTitle>
        <EmptyText theme={theme}>
          Tap the "Add Todo" button below to create your first task!
        </EmptyText>
      </EmptyContainer>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <EmptyContainer>
        <EmptyIcon>🔍</EmptyIcon>
        <EmptyTitle theme={theme}>No matching todos</EmptyTitle>
        <EmptyText theme={theme}>
          {searchQuery
            ? `No todos match "${searchQuery}"`
            : filter === 'active'
            ? 'All todos are completed!'
            : filter === 'completed'
            ? 'No completed todos yet'
            : 'No todos found'}
        </EmptyText>
      </EmptyContainer>
    );
  }

  return (
    <Container theme={theme}>
      <DraggableFlatList
        data={filteredTodos}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        onDragEnd={handleDragEnd}
        contentContainerStyle={{ padding: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
