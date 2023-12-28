import React from 'react'

const NewsItem = (props)=>{

    let {title, description, imageUrl, newsUrl, author, date, source}= props;
    return (
      <div className='my-4 d-flex justify-content-center'>
        <div className="card" style={{width: "23rem"}}>
           <img src={!imageUrl?"https://assets.thehansindia.com/h-upload/2020/05/14/969258-liveupdates.webp": imageUrl} className="card-img-top" alt="..."/>
           
           <div className="card-body">
              <span className="badge bg-danger text-light" style={{marginBottom:"2%"}}>{source}</span>
              <h5 className="card-title">{title}</h5>
               <p className="card-text">{description}</p>
               <p className="card-text"><small className="text-body-secondary">{new Date(date).toDateString()}  &#183; By {!author? "Unknown" : author}</small></p>
               <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
           </div>
        </div>
      </div>
    )

}

export default NewsItem
