let lastId = 0;

export default function(prefix='st'){
    lastId++;
    return `${prefix}${lastId}`;
}