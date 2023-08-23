import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BaseProduct
} from '../types/interfaces';

type Props = {
  item: BaseProduct
};

export default function ProductCard({ item }: Props) {
  // const [image, setImage] = useState<string>('');

  console.log('productcard: ', item.images);


  // useEffect(() => {
  //   item.images.map((el) => {
  //     const img = new Image();
  //     img.src = el;
  //     return img.onload = () => {
  //       if (img.height > 400) {
  //         return setImage(el);
  //       }
  //       return setImage('');
  //     };
  //   });
  // }, [item.images]);

  function handleOrderItem(id: number) {
    console.log('productCard-itemId: ', id);

  }

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <div className='card-block'>
          <img src={item.images[0]}
            className="card-img-top img-fluid" alt={item.title} />
        </div>
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-price">{item.price}</p>
          <Link to={`/catalog/${item.id}`}
            className="btn btn-outline-primary"
            onClick={() => handleOrderItem(item.id)}>Заказать</Link>
        </div>
      </div>
    </div>
  );
}
