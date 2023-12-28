import React, { useEffect , useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"
import LoadingBar from 'react-top-loading-bar'

const News = (props)=> {
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(false)
  let [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  
  const capitaliseFirstLetter= (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  


   const updateNews = async ( )=>{
    props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${process.env.REACT_APP_NEWS_API}&page=${page}&pageSize=${props.pageSize}`;
    
    setloading(true)
    props.setProgress(30);
    let data= await fetch(url);
    props.setProgress(50);
    let parsedData= await data.json();
    props.setProgress(70);

    setarticles(parsedData.articles)
    settotalResults(parsedData.totalArticles)
    setloading(false)
    
    props.setProgress(100);

  }

  useEffect(() => {
    document.title= `NewsMeow - ${capitaliseFirstLetter(props.category)}`;
    updateNews();
  }, [])
  

  const fetchMoreData = async () => {
    
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${process.env.REACT_APP_NEWS_API}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(++page)
  
    let data= await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  };

    return (
      <>
        <h1 className='text-center ' style={{marginTop:'90px'}}> NewsFlash - Top Headlines from {capitaliseFirstLetter(props.category)}</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={ <Spinner />}
        >
        <div className='container my-4'>
        <div className='row'>
        {articles.map((element)=>{
            return <div className='col-md-4' key= {element.url} >
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}  />
            </div>

        })}
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    )

}

News.contextTypedefaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'health',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
