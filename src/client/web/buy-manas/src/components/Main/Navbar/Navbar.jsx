import React, {useState} from 'react';
import styles from './Navbar.module.css'
import { useTranslation } from 'react-i18next';
import CategoriesContainer from './Categories/CategoriesContainer';
import { setPostByTitle } from '../../../actions/index'
import { useDispatch} from 'react-redux';

const Navbar = (props) => {

    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();


    function onClickSearch(search){
        if(search){
            dispatch(setPostByTitle(search));
            setSearchText('')
        }
            
    }

    const { t } = useTranslation();
    return(
        <div className={styles.navbarWrapper}>
            <div className={styles.search}>
                <input 
                    type="search" 
                    placeholder={t('searchPlaceHolder')} 
                    value={searchText} 
                    onChange={(event)=>setSearchText(event.target.value)} 
                />
                <button onClick={()=>onClickSearch(searchText)}>{t('searchButton')}</button>
            </div>
            <CategoriesContainer />
        </div>
    )
}

export default Navbar;
