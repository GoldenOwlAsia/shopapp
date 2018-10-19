import React from 'react';
import styled from 'styled-components/native';
import { SimpleLineIcons } from '@expo/vector-icons';

const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

const Logout = ({ onPress }) => (
  <IconLeftContainer onPress={onPress}>
    <SimpleLineIcons name="logout" size={20} />
  </IconLeftContainer>
);

export default Logout;
