import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import './App.scss';
import { GoodsList } from './GoodsList';

import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const loadGoods = async (getGoods: () => Promise<Good[]>) => {
    try {
      const products = await getGoods();

      setGoods(products);
    } catch (error) {
      setIsLoadingError(true);
    }
  };

  return (
    <div className="App block p-5" style={{ width: '550px' }}>
      <h1 className="is-size-2 px-5">Dynamic list of Goods</h1>

      <button
        className="button is-rounded is-outlined is-info"
        type="button"
        data-cy="all-button"
        onClick={() => loadGoods(getAll)}
      >
        Load all goods
      </button>

      <button
        className="button is-rounded is-outlined is-info"
        type="button"
        data-cy="all-button"
        onClick={() => loadGoods(get5First)}
      >
        Load 5 first goods
      </button>

      <button
        className="button is-rounded is-outlined is-danger"
        type="button"
        data-cy="all-button"
        onClick={() => loadGoods(getRedGoods)}
      >
        Load red goods
      </button>

      {isLoadingError
        ? (
          <div className="message p-2 my-4 is-danger">
            <p className="message-body">Error loading goods</p>
          </div>
        )
        : <GoodsList goods={goods} />}
    </div>
  );
};
