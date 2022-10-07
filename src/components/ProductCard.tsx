import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderItem } from '../store/middleware';

export default function ProductCard({item}) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  useEffect(() => {
    item.images.map((el) => {
      const img = new Image();
      img.src = el;
      return img.onload = () => {
        if (img.height > 400) {
          return setImage(el);
        };
        return setImage(null);
      };
    });
  }, [item.images]);

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <div className='card-block'>
          <img src={image === null ? item.images[0] : image}
            className="card-img-top img-fluid" alt={item.title}/>
        </div>
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-price">{item.price}</p>
          <Link to={`/catalog/${item.id}`}
            className="btn btn-outline-primary"
            onClick={() => dispatch(getOrderItem(item.id))}>Заказать</Link>
        </div>
      </div>
    </div>
  );
};
