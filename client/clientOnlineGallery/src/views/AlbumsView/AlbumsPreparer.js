import { tilesGrid } from '../albumsTilesGrid';
// import { testAlbums } from "../../albums";

export const prepareAlbums = (response) => {
	var albums = response.map(function (currentValue, index) { 
		if (currentValue.label == null){
			// currentValue.src = "https://www.scrapbookingmecca.com/img/digiscrap/digiscrap.png";
			currentValue.src = "https://100velikih.com/uploads/images/l/i/t/little_big_my_dick_is_very_big_slava.jpg";
			currentValue.label = "Empty";
		}
		else{
			currentValue.src = currentValue.label.byteArray;
			currentValue.label = currentValue.label.name;
		}

			currentValue.width = tilesGrid[index % tilesGrid.length].width;
			currentValue.height = tilesGrid[index % tilesGrid.length].height;

	    return currentValue;
	})

	return albums;
}