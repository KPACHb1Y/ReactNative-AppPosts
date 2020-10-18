import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {MainScreen} from "../Screens/MainScreen";
import {PostScreen} from "../Screens/PostScreen";
import {THEME} from "../theme";
import {BookMarkedScreen} from "../Screens/BookMarkedScreen";
import {AboutScreen} from "../Screens/AboutScreen";
import {CreateScreen} from "../Screens/CreateScreen";


const navigatorOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
    }
}

const PostNavigator =  createStackNavigator({
    Main: MainScreen,
    Post: PostScreen
}, navigatorOptions);

const BookNavigator = createStackNavigator({
    Booked: BookMarkedScreen,
    Post: PostScreen
}, navigatorOptions);

const bottomTabsConfig = {
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarLabel: 'Все посты',
            tabBarIcon: info => <Ionicons name='ios-albums' size={25} color={info.tintColor}/>
        }
    },
    Booked: {
        screen: BookNavigator,
        navigationOptions: {
            tabBarLabel: 'Избранное',
            tabBarIcon: info => <Ionicons name='ios-star' size={25} color={info.tintColor}/>
        }
    }
}

const BottomNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(bottomTabsConfig, {
        activeTintColor: '#fff',
        shifting: true,
        barStyle: {
            backgroundColor: THEME.MAIN_COLOR
        }
    })
    : createBottomTabNavigator(
    bottomTabsConfig,
    {
        tabBarOptions: {
            activeTintColor: THEME.MAIN_COLOR
        }
});

const AboutNavigator = createStackNavigator({
    About: AboutScreen
}, navigatorOptions);

const CreateNavigator = createStackNavigator({
    Create: CreateScreen
}, navigatorOptions);

const MainNavigator = createDrawerNavigator({
    PostTabs: {
        screen: BottomNavigator,
        navigationOptions: {
            drawerLabel: 'Мои посты',
            // drawerIcon: <Ionicons name='ios-star'/>
        }
    },
    AboutTabs: {
        screen: AboutNavigator,
        navigationOptions: {
            drawerLabel: 'О приложении'
        }
    },
    CreateTabs: {
        screen: CreateNavigator,
        navigationOptions: {
            drawerLabel: 'Создать пост'
        }
    }
}, {
    contentOptions: {
        activeTintColor: THEME.MAIN_COLOR,
        labelStyle: {
            fontFamily: 'open-bold'
        }
    }
})

export const AppNavigation = createAppContainer(MainNavigator);