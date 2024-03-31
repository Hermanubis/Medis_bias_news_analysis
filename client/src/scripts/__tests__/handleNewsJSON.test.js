import handleNewsJSON from '../handleNewsJSON';
import testNews from './testNews.json';

describe('Unit tests for handleNewsJSON', () => {
    test('Function exists', () => {
        expect(handleNewsJSON).toBeDefined();
    });

    const info = handleNewsJSON(testNews);

    test('Function returns', () => {
        console.log(info);
        expect(info).toBeDefined();
    });

    // note: this fails because the lines before the function do not run;
    // should move the `source` array outside the file and read from it at runtime
    test('Returns at least one non-empty list', () => {
        let empty = true;
        for (let arr in info) {
            console.log(arr);
            if (Array.isArray(arr) && arr.length > 0) {
                for (let e in arr) {
                    console.log(e);
                    if (Array.isArray(e) && e.length == 0) {
                        // inner array contains something
                        empty = false;
                    }
                    else if (!Array.isArray(e)) {
                        // some non-array element
                        empty = false;
                    }
                }
            }
        }
        expect(empty).toBeFalsy();
    });
});