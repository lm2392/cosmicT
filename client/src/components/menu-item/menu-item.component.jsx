import React, {Fragment} from 'react';
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import { withRouter } from 'react-router-dom';

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  ContentTitle,
  ContentSubtitle
} from './menu-item.styles';

const CARD_QUERY = gql`
  query CardQuery {
    card(id:"1"){
      name,
      id,
      desc
    }
  }
`;

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <MenuItemContainer
    size={size}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <BackgroundImageContainer
      className='background-image'
      imageUrl={imageUrl}
    />
    <ContentContainer className='content'>
      <ContentTitle>
        <div>
        <Query query={CARD_QUERY}>
          {
            ({ loading , error, data }) =>{
              if(loading) return <div>...is loading...</div>
              if(error) console.log(error);
              console.log(data);
            return <div>{data.card.name}</div>
            }
          }
        </Query>
        </div>
        {title.toUpperCase()}</ContentTitle>
      <ContentSubtitle>SHOP NOW</ContentSubtitle>
    </ContentContainer>
  </MenuItemContainer>
);

export default withRouter(MenuItem);
