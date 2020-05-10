import { tilesGrid } from '../imagesTilesGrid';
 // import { photos } from "../../photos";

export const prepareImages = (response) => {

	var albums = response.albumResponse.images.map(function (currentValue, index) { 
		currentValue.src = currentValue.byteArray;
		currentValue.byteArray = null;
		currentValue.width = tilesGrid[index % tilesGrid.length].width;
		currentValue.height = tilesGrid[index % tilesGrid.length].height;
	    return currentValue;
	})

	return albums;
}