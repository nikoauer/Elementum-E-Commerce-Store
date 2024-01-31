import { useSelector } from 'react-redux'

const FavouriteCounter = () => {

    const favourites = useSelector(state => state.favourites)
    const favouritesCounter = favourites.length

  return (
    <div className='absolute bottom-4 left-5'>
        {favouritesCounter > 0 && (
            <span className='px-1 rounded-full text-sm text-white bg-red-500'>{favouritesCounter}</span>
        )

        }
    </div>
  )
}

export default FavouriteCounter