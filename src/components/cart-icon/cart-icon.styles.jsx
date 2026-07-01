import styled from 'styled-components';

import ShoppingSvg from '../../assets/shopping-bag.svg?react';

export const ShoppingIcon = styled(ShoppingSvg)`
  width: 32px;
  height: 32px;
`;

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  top: 12px;
`;

