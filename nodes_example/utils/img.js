export class IMG {
    constructor(width, height, data) {
        this.width = width;
        this.height = height;
        this.data = data;
    }
    getPixel(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return 0;
        const index = y * this.width + x;
        const byteIndex = index >> 3;
        const bitOffset = index & 7;
        return (this.data[byteIndex] >> bitOffset) & 1;
    }
}