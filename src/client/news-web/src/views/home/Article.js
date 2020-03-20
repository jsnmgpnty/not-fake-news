import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { FiChevronRight } from 'react-icons/fi';
import * as colors from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import './Article.scss';

const Article = (props) => {
  const { item: article, className } = props;

  const randomAvatarColor = () => {
    const colorsSelection = [
      colors.amber,
      colors.blue,
      colors.cyan,
      colors.deepOrange,
      colors.deepPurple,
      colors.green,
      colors.indigo,
      colors.lightBlue,
      colors.lightGreen,
      colors.lime,
      colors.orange,
      colors.pink,
      colors.purple,
      colors.red,
      colors.teal,
      colors.yellow,
    ];

    const index = Math.floor(Math.random() * 15);
    return colorsSelection[index]['400'];
  };

  const getAuthorInitials = (author) => {
    let initials = author.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    return initials;
  };

  const renderAuthor = (author) => {
    if (!author) {
      return null;
    }

    return (
      <Avatar className="news-article--header-avatar" style={{ backgroundColor: randomAvatarColor() }}>
        {getAuthorInitials(author)}
      </Avatar>
    );
  }

  const renderImage = (imageUrl, title) => {
    if (_.isNil(imageUrl)) {
      return null;
    }

    return (
      <CardMedia
        className="news-article--media"
        image={imageUrl}
        title={title}
      />
    );
  }
  
  const goToUrl = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Card className={`news-article ${className}`}>
      <CardHeader
        className="news-article--header"
        avatar={renderAuthor(article.author)}
        action={
          <IconButton onClick={() => goToUrl(article.url)}>
            <FiChevronRight />
          </IconButton>
        }
        title={article.title}
        subheader={
          <Typography variant="caption">
            {moment(article.publishedAt).format('LLL')}
          </Typography>
        }
      />
      {article.urlToImage && renderImage(article.urlToImage, article.title)}
      <CardContent className="news-article--content">
        <Typography variant="body2" color="textSecondary" component="p">
          {article.content}
        </Typography>
      </CardContent>
    </Card>
  )
}

Article.propTypes = {
  item: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string,
    publishedAt: PropTypes.string.isRequired,
    content: PropTypes.string,
    source: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  className: PropTypes.string,
};

Article.defaultProps = {
  className: '',
};

export default Article;
