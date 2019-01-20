const masonryLayout = (containerElem, itemsElems, columns) => {
    containerElem.className = '';
    containerElem.classList.add('masonry-layout', `columns-${columns}`);
    while(containerElem.firstChild){
        containerElem.removeChild(containerElem.firstChild);
    }
    let columnsElements = [];
    for (let i = 1; i <= columns; i++){
        let column = document.createElement('div');
        column.classList.add('masonry-column', `column-${i}`);
        containerElem.appendChild(column);
        columnsElements.push(column);
    }

    for(let m = 0; m < Math.ceil(itemsElems.length / columns); m++){
        for(let n = 0; n < columns; n++){
            let item = itemsElems[m * columns + n];
            columnsElements[n].appendChild(item);
            item.classList.add('masonry-item');
        }
    }
}

const mqls = [
    {mql: matchMedia ('(min-width: 1px) and (max-width:499px)'), cols: 1}, 
    {mql: matchMedia ('(min-width: 500px) and (max-width:799px)'), cols: 2}, 
    {mql: matchMedia ('(min-width: 800px)'), cols: 3}];

const changeSize = (cols, e) => {
    if(e.matches){
        masonryLayout(document.getElementById('gallery'), document.querySelectorAll('.gallery-item'), cols);
    }
}

mqls.map((item) => {
    item.mql.addListener(changeSize.bind(this, item.cols));
    if(item.mql.matches){
        changeSize(item.cols, item.mql);
    }
})