import React, { useState, useContext } from 'react';
import { View, SafeAreaView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native';
import { ThemeContext } from '../components/ThemeProvider';
import { ThemeToggle } from '../components/ThemeToggle';
import TodoList from '../components/TodoList';
import TodoModal from '../components/TodoModal';
import { useAddTodo, useUpdateTodo } from '../convex/hooks';

const SafeContainer = styled.SafeAreaView<{ theme: any }>`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.Text<{ theme: any }>`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const SearchContainer = styled.View<{ theme: any }>`
  margin-bottom: 16px;
`;

const SearchInput = styled.TextInput<{ theme: any }>`
  background-color: ${({ theme }) => theme.inputBackground};
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  min-height: 44px;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 16px;
`;

const FilterButton = styled.TouchableOpacity<{ theme: any; active: boolean }>`
  flex: 1;
  background-color: ${({ theme, active }) => active ? theme.primary : theme.card};
  border-width: 1px;
  border-color: ${({ theme, active }) => active ? theme.primary : theme.border};
  border-radius: 10px;
  padding: 10px 16px;
  align-items: center;
  justify-content: center;
`;

const FilterButtonText = styled.Text<{ theme: any; active: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme, active }) => active ? '#FFFFFF' : theme.text};
`;

const ListContainer = styled.View`
  flex: 1;
`;

const AddButton = styled.TouchableOpacity<{ theme: any }>`
  background-color: ${({ theme }) => theme.primary};
  border-radius: 16px;
  padding: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  shadow-color: ${({ theme }) => theme.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 4;
`;

const AddButtonText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF;
`;

type FilterType = 'all' | 'active' | 'completed';

export default function HomeScreen() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const add = useAddTodo();
  const update = useUpdateTodo();
  const { theme, mode } = useContext(ThemeContext);

  const handleAdd = async (data: { title: string; description: string; dueDate: string | null }) => {
    try {
      await add({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        order: Date.now(),
      });
    } catch (error) {
      throw error;
    }
  };

  const handleEdit = async (data: { title: string; description: string; dueDate: string | null }) => {
    if (!editingTodo) return;
    try {
      await update({
        id: editingTodo._id,
        patch: {
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
        },
      });
      setEditingTodo(null);
    } catch (error) {
      throw error;
    }
  };

  const openModal = (todo?: any) => {
    if (todo) {
      setEditingTodo(todo);
    } else {
      setEditingTodo(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTodo(null);
  };

  return (
    <>
      <StatusBar 
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.background}
      />
      <SafeContainer theme={theme}>
        <Container>
          <Header>
            <Title theme={theme}>My Todos</Title>
            <ThemeToggle />
          </Header>

          <SearchContainer theme={theme}>
            <SearchInput
              theme={theme}
              placeholder="Search todos..."
              placeholderTextColor={theme.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </SearchContainer>

          <FilterContainer>
            <FilterButton
              theme={theme}
              active={filter === 'all'}
              onPress={() => setFilter('all')}
            >
              <FilterButtonText theme={theme} active={filter === 'all'}>
                All
              </FilterButtonText>
            </FilterButton>
            <FilterButton
              theme={theme}
              active={filter === 'active'}
              onPress={() => setFilter('active')}
            >
              <FilterButtonText theme={theme} active={filter === 'active'}>
                Active
              </FilterButtonText>
            </FilterButton>
            <FilterButton
              theme={theme}
              active={filter === 'completed'}
              onPress={() => setFilter('completed')}
            >
              <FilterButtonText theme={theme} active={filter === 'completed'}>
                Completed
              </FilterButtonText>
            </FilterButton>
          </FilterContainer>

          <ListContainer>
            <TodoList 
              searchQuery={searchQuery} 
              filter={filter} 
              onEdit={(todo) => openModal(todo)}
            />
          </ListContainer>

          <AddButton theme={theme} onPress={() => openModal()} activeOpacity={0.8}>
            <AddButtonText>+ Add Todo</AddButtonText>
          </AddButton>
        </Container>

        <TodoModal
          visible={modalOpen}
          onClose={closeModal}
          onSubmit={editingTodo ? handleEdit : handleAdd}
          initialData={editingTodo ? {
            title: editingTodo.title,
            description: editingTodo.description,
            dueDate: editingTodo.dueDate,
          } : undefined}
          mode={editingTodo ? 'edit' : 'add'}
        />
      </SafeContainer>
    </>
  );
}
