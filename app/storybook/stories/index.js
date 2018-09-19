import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';

import { MaterialIcons } from '@expo/vector-icons';

import BaseButton from '../../src/components/BaseButton';
import AvatarPicker from '../../src/components/AvatarPicker';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <BaseButton title="Basic Button" />
  ))
  .add('with left icon', () => (
    <BaseButton
      onPress={() => { alert('click button') }}
      IconLeft={<MaterialIcons style={{ fontSize: 24, color: '#FFF'}} name="menu" />}
      fullWidth title="Basic Button" />
  ))
  .add('with right icon', () => (
    <BaseButton
      onPress={() => { alert('click button') }}
      IconRight={<MaterialIcons style={{ fontSize: 24, color: '#FFF'}} name="home" />}
      fullWidth title="Basic Button" />
  ))
  .add('with two icons', () => (
    <BaseButton
      onPress={() => { alert('click button') }}
      IconLeft={<MaterialIcons style={{ fontSize: 24, color: '#FFF'}} name="menu" />}
      IconRight={<MaterialIcons style={{ fontSize: 24, color: '#FFF'}} name="home" />}
      titleStyle={{ textAlign: 'left' }}
      fullWidth title="Basic Button" />
  ))
  .add('with loading', () => (
    <BaseButton loading title="Basic Button" />
  ));

  storiesOf('Avatar', module)
    .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
    .add('Default', () => (
      <AvatarPicker />
    ))  