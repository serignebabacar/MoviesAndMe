import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import FilmDetailPhoto from '../Components/FilmDetailPhoto'

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
export default createAppContainer(SearchStackNavigator)
