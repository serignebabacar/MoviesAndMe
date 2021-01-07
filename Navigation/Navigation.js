import React from 'react'
import { createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { Image,StyleSheet} from 'react-native'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import FilmDetailPhoto from '../Components/FilmDetailPhoto'
import Favorites from '../Components/Favorites'


const SearchStackNavigator = createStackNavigator({
  Search : {
    screen : Search,
    navigationOptions : {
      title : "Rechercher"
    }
  },
  FilmDetail : {
    screen : FilmDetail
  },
  FilmDetailPhoto : {
    screen : FilmDetailPhoto
  }
})
const MoviesTabsNavigator = createBottomTabNavigator({
  Search : {
    screen : SearchStackNavigator,
    navigationOptions : {
      tabBarIcon :() => {
        return <Image
            source ={require('../Images/ic_search.png')}
            style = {styles.icon} />
      }
    }
  },
  Favorites : {
    screen : Favorites,
    navigationOptions : {
      tabBarIcon: () => {
        return <Image
            source ={require('../Images/ic_favorite.png')}
            style = {styles.icon}/>
      }
    }
  }
},{
  tabBarOptions : {
    showLabel : false,
    showIcon : true,
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF'
  }
})

const styles= StyleSheet.create({
  icon : {
    width: 30,
    height: 30
  }
})
export default createAppContainer(MoviesTabsNavigator)
