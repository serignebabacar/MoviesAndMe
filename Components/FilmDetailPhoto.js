import React from 'react'
import {StyleSheet,View,Text,ActivityIndicator,ScrollView,Image,TouchableOpacity} from 'react-native'
import {getFilmDetailFromApiById,getImageFromApi} from '../API/TMDBApi'

class FilmDetailPhoto extends React.Component{
  constructor(props){
    super(props),
    this.state = {
      film : undefined,
      isloading : true
    }
  }
  _displayLoding(){
    if(this.state.isloading){
      return (
        <View style = {styles.loading_container}>
        <ActivityIndicator size="large"/>
        </View>
      )
    }
  }
  componentDidMount(){

    getFilmDetailFromApiById(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film : data ,
        isloading : false
      })
    })
  }
  _displayImage(){
    const film = this.state.film
    if(film != undefined){
      return (
              <Image
                style={styles.image}
                source={{uri: getImageFromApi(film.backdrop_path)}}
              />
    )
  }
}

    render(){
      const idFilm = this.props.navigation.state.params.idFilm

      return(
        <View style = {styles.main_container}>
        {this._displayLoding()}
          {this._displayImage()}
        </View>
      )
    }
}
const styles = StyleSheet.create({
  main_container : {
    flex: 1
  },
  container_scroller : {
    flex : 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 300,
    margin: 5,
  }
})

export default FilmDetailPhoto
