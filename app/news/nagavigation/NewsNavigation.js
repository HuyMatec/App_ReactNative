import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Add from '../../../Add';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const NewsNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBarOptions={{
                labelStyle: { fontSize: 14 },
                activeTintColor: 'blue', // Màu sắc của tab được chọn
                inactiveTintColor: 'gray', // Màu sắc của các tab không được chọn
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? 'home' : 'home'} size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Detail"
                component={Detail}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? 'info-circle' : 'info-circle'} size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Add"
                component={Add}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon name={focused ? 'plus-circle' : 'plus-circle'} size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default NewsNavigation;
