import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import { ThemeContext } from './ThemeProvider';

const ModalContainer = styled.View<{ theme: any }>`
  background-color: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 24px;
  max-height: 80%;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.Text<{ theme: any }>`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const CloseButton = styled.TouchableOpacity`
  padding: 8px;
`;

const CloseText = styled.Text<{ theme: any }>`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  font-weight: 300;
`;

const InputContainer = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text<{ theme: any }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

const Input = styled.TextInput<{ theme: any }>`
  background-color: ${({ theme }) => theme.inputBackground};
  border-width: 1px;
  border-color: ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  min-height: 44px;
`;

const DescriptionInput = styled(Input)`
  min-height: 80px;
  text-align-vertical: top;
`;

const DateButton = styled.TouchableOpacity<{ theme: any; hasDate: boolean }>`
  background-color: ${({ theme, hasDate }) => hasDate ? theme.primary : theme.inputBackground};
  border-width: 1px;
  border-color: ${({ theme, hasDate }) => hasDate ? theme.primary : theme.border};
  border-radius: 10px;
  padding: 12px 16px;
  min-height: 44px;
  justify-content: center;
`;

const DateButtonText = styled.Text<{ theme: any; hasDate: boolean }>`
  font-size: 16px;
  color: ${({ theme, hasDate }) => hasDate ? '#FFFFFF' : theme.text};
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: 12px;
  margin-top: 8px;
`;

const Button = styled.TouchableOpacity<{ theme: any; variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  background-color: ${({ theme, variant }) => 
    variant === 'primary' ? theme.primary : 
    variant === 'danger' ? theme.danger : 
    theme.cardHover};
  border-radius: 10px;
  padding: 14px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text<{ theme: any; variant?: 'primary' | 'secondary' | 'danger' }>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme, variant }) => 
    variant === 'primary' || variant === 'danger' ? '#FFFFFF' : theme.text};
`;

interface TodoModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; dueDate: string | null }) => Promise<void>;
  initialData?: {
    title: string;
    description?: string;
    dueDate?: string | null;
  };
  mode?: 'add' | 'edit';
}

export default function TodoModal({
  visible,
  onClose,
  onSubmit,
  initialData,
  mode = 'add'
}: TodoModalProps) {
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      if (initialData) {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setDueDate(initialData.dueDate || null);
      } else {
        setTitle('');
        setDescription('');
        setDueDate(null);
      }
    }
  }, [visible, initialData]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your todo');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate,
      });
      setTitle('');
      setDescription('');
      setDueDate(null);
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save todo. Please try again.');
      console.error('Error saving todo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = () => {
    // Show alert with date options
    // In production, you could use a proper date picker like @react-native-community/datetimepicker
    const options: any[] = [
      { text: 'Today', onPress: () => {
        const date = new Date();
        date.setHours(23, 59, 59, 999);
        setDueDate(date.toISOString());
      }},
      { text: 'Tomorrow', onPress: () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        date.setHours(23, 59, 59, 999);
        setDueDate(date.toISOString());
      }},
      { text: 'Next Week', onPress: () => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        date.setHours(23, 59, 59, 999);
        setDueDate(date.toISOString());
      }},
      { text: 'Clear', onPress: () => setDueDate(null), style: 'destructive' as const },
      { text: 'Cancel', style: 'cancel' as const },
    ];

    Alert.alert('Select Due Date', 'Choose a date', options);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Set due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={{ justifyContent: 'flex-end', margin: 0 }}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <ModalContainer theme={theme}>
        <ModalHeader>
          <ModalTitle theme={theme}>{mode === 'add' ? 'New Todo' : 'Edit Todo'}</ModalTitle>
          <CloseButton onPress={onClose}>
            <CloseText theme={theme}>×</CloseText>
          </CloseButton>
        </ModalHeader>

        <InputContainer>
          <Label theme={theme}>Title *</Label>
          <Input
            theme={theme}
            placeholder="Enter todo title"
            placeholderTextColor={theme.placeholder}
            value={title}
            onChangeText={setTitle}
            autoFocus
            maxLength={100}
          />
        </InputContainer>

        <InputContainer>
          <Label theme={theme}>Description</Label>
          <DescriptionInput
            theme={theme}
            placeholder="Enter description (optional)"
            placeholderTextColor={theme.placeholder}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            maxLength={500}
          />
        </InputContainer>

        <InputContainer>
          <Label theme={theme}>Due Date</Label>
          <DateButton
            theme={theme}
            hasDate={!!dueDate}
            onPress={handleDateSelect}
          >
            <DateButtonText theme={theme} hasDate={!!dueDate}>
              {dueDate ? `📅 ${formatDate(dueDate)}` : '📅 Set due date (optional)'}
            </DateButtonText>
          </DateButton>
        </InputContainer>

        <ButtonRow>
          <Button theme={theme} variant="secondary" onPress={onClose} disabled={loading}>
            <ButtonText theme={theme} variant="secondary">Cancel</ButtonText>
          </Button>
          <Button 
            theme={theme} 
            variant="primary" 
            onPress={handleSubmit} 
            disabled={loading || !title.trim()}
          >
            <ButtonText theme={theme} variant="primary">
              {loading ? 'Saving...' : mode === 'add' ? 'Create' : 'Save'}
            </ButtonText>
          </Button>
        </ButtonRow>
      </ModalContainer>
    </Modal>
  );
}

