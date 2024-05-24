import React, { useState } from 'react';
import Menu from './Menu';
import Product from './Product';
import Popular from './Popular';

function ParentComponent({refRestCart}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div>
      <Popular refreshCart={refRestCart}/>
      <Menu onSelectCategory={handleCategorySelect} />
      <Product categoryId={selectedCategoryId} refreshCart={refRestCart}/>
    </div>
  );
}

export default ParentComponent;