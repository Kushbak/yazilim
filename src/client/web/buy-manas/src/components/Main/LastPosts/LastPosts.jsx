import React from 'react';
import styles from './LastPosts.module.css'
import { useTranslation } from 'react-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGES_URL } from '../../../constants';
import { NavLink } from 'react-router-dom';
import Preloader from '../../common/Preloader/Preloader';
import InfiniteScroll from "react-infinite-scroller";
const LastPosts = (props) => {
    const { t } = useTranslation();

    // cicle for top 10 posts 
    const LastPostsArray = [];
    props.posts.sort((a, b) => {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
    }).map(p => {
        LastPostsArray.push(p);
    });

    return (
        <div className={styles.LastPostsWrapper}>
            <h3>{t('postsLast')}</h3>

            <div className={styles.lastPosts} >
                    {LastPostsArray.map(p => (
                        <NavLink to={`posts/${p.id}`}>
                            <div className={styles.lastPostItem} key={p.id}>
                                <div className={styles.imgBlock}>
                                    {p.images
                                        ? p.images.length ?
                                            <img src={IMAGES_URL + p.images[0].url} alt="categoryIcon" />
                                            :
                                            <img src={require('../../../assets/images/logo.png')} alt="categoryIcon" />
                                        : <Preloader />
                                    }
                                </div>

                                <p className={styles.cost}> {p.cost != null ? p.cost + ' сом' : t('contract')}</p>
                                <p className={styles.postTitle}>{p.title}</p>
                            </div>
                        </NavLink>
                    ))} 

            </div>
        </div>
    );
}

export default LastPosts;