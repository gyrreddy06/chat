import React from 'react';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { StyleSheet, View } from 'react-native';
import { MessageSquare, Image, Compass, User, Plus } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Theme from '@/constants/Theme';

function TabBarIcon({ focused, color, size, icon }) {
  const Icon = icon;
  return (
    <Icon 
      size={size} 
      color={color} 
      strokeWidth={focused ? 2.5 : 2}
    />
  );
}

export default function TabLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.pink,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          height: 80,
        },
        tabBarBackground: () => (
          <BlurView
            tint={isDark ? 'dark' : 'light'}
            intensity={80}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarLabelStyle: {
          fontFamily: Theme.typography.fontFamily.primary.medium,
          fontSize: 12,
          marginBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon 
              focused={focused} 
              color={color} 
              size={size} 
              icon={MessageSquare} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stories"
        options={{
          title: 'Stories',
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon 
              focused={focused} 
              color={color} 
              size={size} 
              icon={Image} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="compose"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.composeButton}>
              <Plus size={28} color="white" />
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('chat/new');
          },
        })}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon 
              focused={focused} 
              color={color} 
              size={size} 
              icon={Compass} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon 
              focused={focused} 
              color={color} 
              size={size} 
              icon={User} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  composeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    ...Theme.shadows.md,
  },
});