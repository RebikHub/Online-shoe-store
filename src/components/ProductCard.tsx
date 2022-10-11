import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Products } from '../interfaces';
import { useAppDispatch } from '../store/hooks';
import { getOrderItem } from '../store/middleware';

type Props = {
  item: Products
};

export default function ProductCard({item}: Props) {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    item.images.map((el) => {
      const img = new Image();
      img.src = el;
      return img.onload = () => {
        if (img.height > 400) {
          return setImage(el);
        };
        return setImage('');
      };
    });
  }, [item.images]);

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <div className='card-block'>
          <img src={image === '' ? item.images[0] : image}
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
