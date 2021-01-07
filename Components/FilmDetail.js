import React from 'react'
import {StyleSheet,View,Text,ActivityIndicator,ScrollView,Image,TouchableOpacity,Button} from 'react-native'
import {getFilmDetailFromApiById,getImageFromApi} from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'

class FilmDetail extends React.Component{
constructor (props) {
  super(props)
  this.state = {
    film : undefined,
    isloading : true
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
  _toggleFavorite(){
    const action = {type : 'TOGGLE_FAVORITE', value : this.state.film}
    this.props.dispatch(action)
  }
  componentDidUpdate(){
    console.log(this.props.favoritesFilm);
  }
  _displayFavoriteImage(){
    var sourceImage  = require('../Images/ic_favorite_border.png')
    if(this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1){
       sourceImage  = require('../Images/ic_favorite.png')
    }
    return(
      <Image
        source = {sourceImage }
        style = {styles.favorite_image}
      />
          )
  }
  _displayFilmDetailId(){
    const {film }= this.state

    if(film != undefined){
      return (
        <ScrollView style = {styles.container_scroller}>
          <TouchableOpacity   onPress = {()=> this._fairePlay(film.id)}>
              <Image
                style={styles.image}
                source={{uri: getImageFromApi(film.backdrop_path)}}
              />
          </TouchableOpacity>
          <TouchableOpacity
            onPress ={() => this._toggleFavorite()}
            style = {styles.favorite_container}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>
           <Text style={styles.title_text}>{film.title}</Text>
           <Text style={styles.description_text}>{film.overview}</Text>
           <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
           <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
           <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
           <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
           <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
               return genre.name;
             }).join(" / ")}
           </Text>
           <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
               return company.name;
             }).join(" / ")}
           </Text>
        </ScrollView>
      )
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
  _fairePlay = (filmId) =>{
    this.props.navigation.navigate("FilmDetailPhoto",{idFilm: filmId})
  }
  render(){
    return(
      <View style = {styles.main_container}>
      {this._displayFilmDetailId()}
    {this._displayLoding()}
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
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container:{
    alignItems: 'center'
  },
  favorite_image:{
    width: 40,
    height: 40
  }
})
const mapStateToProps = (state) => {
  return {
    favoritesFilm : state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)
