//import React, { useEffect,useLayoutEffect,useState } from 'react'
import React, { useEffect,useState } from 'react'
import Newsitems from './Newsitems'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props)=>{

  const[articles,setArticles]=useState();
  const[loading,setLoading]=useState(false);
  const[page,setPage]=useState(1);
  const[totalResult,setTotalResult]=useState(0);
  const capitalizeFirstLetter=(string)=> {
    if (!string.length > 0){ 
      return undefined;
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews=async()=>{
    console.log("rUNNING");
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=57164da979c64ceb8b9f15ebc536637f&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedata = await data.json();
    console.log(parsedata);
    props.setProgress(70);
    setArticles(parsedata.articles);
    setTotalResult(parsedata.totalResult);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    updateNews();
    document.title = `${capitalizeFirstLetter(props?.category || "")} - DNews`;
  },[props.category]);

  const fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=57164da979c64ceb8b9f15ebc536637f&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    setLoading(true);
    let data = await fetch(url);
    let parsedata = await data.json();

    // if (parsedata?.status === "ok"){
      setArticles([...articles, ...parsedata.articles]);
      // setArticles(articles.concat(parsedata.articles));
      setTotalResult(parsedata.totalResults);
    // }

    setLoading(false);
  };
    return (
        articles?.length > 0 && <>
         <h1 className="text-center" style={{margin:'35px', marginTop:'90px'}}>DNews - Top {capitalizeFirstLetter(props?.category || "")} Headlines</h1>
         {loading && <Loading/>}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResult}
          loader={loading && <Loading/>}
          >
              <div className="container">
              <div className="row my-3">
              {articles.map((element)=>{
                  return <div className="col-md-4" key={element.url}>
                  <Newsitems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                  </div>
              })}
              </div>
              </div>
        </InfiniteScroll>
      </>
      
    )
  
}


News.defaultProps={
  country : 'in',
  pageSize:9,
  category:'general'
}

News.propTypes={
 country: PropTypes.string,
 pageSize:PropTypes.number,
 category: PropTypes.string
}

export default News
