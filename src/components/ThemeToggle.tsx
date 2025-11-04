import React, { useContext } from 'react';
import { Switch, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { ThemeContext } from './ThemeProvider';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Label = styled.Text<{ theme: any }>`
  color: ${({ theme }) => theme.subText};
  font-size: 14px;
  font-weight: 500;
`;

export const ThemeToggle = () => {
  const { mode, toggle, theme } = useContext(ThemeContext);
  return (
    <Container accessibilityRole="switch" accessibilityState={{ checked: mode === 'dark' }}>
      <Label theme={theme}>{mode === 'light' ? '🌙' : '☀️'}</Label>
      <Switch 
        onValueChange={toggle} 
        value={mode === 'dark'}
        trackColor={{ false: '#767577', true: theme.primary }}
        thumbColor={mode === 'dark' ? '#fff' : '#f4f3f4'}
      />
    </Container>
  );
};
