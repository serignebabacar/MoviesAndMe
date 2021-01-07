
import React from 'react'
import {ActivityIndicator,Text,FlatList, StyleSheet, View,TextInput,Button} from 'react-native'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'
class Search extends React.Component{
  constructor(props){
    super(props)
    this.page = 0,
    this.totalPages= 0,
    this.state = {
      films :[],
      isloading : false
    }
    this.searchedText=""
  }
  _InputTex(text){
    this.searchedText = text
  }
  _loadFilms(){
    this.setState({ isloading : true})
    if(this.searchedText.length>0){
      getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then(
        data => {
          this.page = data.page,
          this.totalPages = data.total_pages,
          this.setState({
            films : [...this.state.films,...data.results],
            isloading : false
          })
        })
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
    _searchFilms(){
      this.page =  0 ,
      this.totalPages = 0,
      this.setState({
        films : []
      },() =>{
        console.log("Page : "+this.page +" totalPages : " +this.totalPages+ " Nombre de pages : " +this.state.films.length)
        this._loadFilms()
      })
    }
    _displayDetailForFilm = (filmId) =>{
      this.props.navigation.navigate("FilmDetail",{idFilm: filmId})
    }
  render(){
    return(
      <View style={styles.main_container}>
        <TextInput onSubmitEditing = {()=> this._searchFilms()} onChangeText={(text)=>this._InputTex(text)} style={styles.textinput} placeholder="Titre du Film"/>
        <Button style={{height: 50}} title="Rechercher" onPress={()=> this._searchFilms()}/>
        <FlatList
          data ={this.state.films}
          extraData={this.props.favoritesFilm}
          keyExtractor={(item)=> item.id.toString()}
          onEndReachThreashold ={0.5}
          onEndReached={()=>{
            if(this.page<this.totalPages){
              this._loadFilms()
            }}
          }
          renderItem={({item})=>
            <FilmItem
            film={item}
            displayDetailForFilm ={this._displayDetailForFilm}
            isFilmFavorite = {(this.props.favoritesFilm.findIndex(film => film.id === item.id)!== -1)? true:false}
          />}

        />
          {this._displayLoding()}
      </View>

    )
  }
}
const styles = StyleSheet.create({
  main_container:{
    flex: 1
  },
  textinput:{
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => {
  return{
    favoritesFilm : state.favoritesFilm
  }
}

export default  connect(mapStateToProps)(Search)
