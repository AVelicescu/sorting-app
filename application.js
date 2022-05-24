const container = document.getElementById('container');
let sizeOfArray = 100;
let arrayRand = [];
let x = [];
let delay = 30;

function GenerateArray()
{
    for(let i = 0; i < sizeOfArray; i++)
    {
        x.push(document.createElement("div"));
    }
    for(let i = 0; i < sizeOfArray; i++)
    {
        x[i].setAttribute("class", "element");
        container.appendChild(x[i]);
    }
    for(let i = 0; i < sizeOfArray; i++)
    {
        arrayRand.push(Math.random()*700);
        x[i].style.height = arrayRand[i] + 'px';
        x[i].style.left = 10*i + 'px';
    }
}

function changeColor(i, c)
{
    x[i].style.backgroundColor = c;
}

function swap(i, j)
{
    let aux = arrayRand[i];
    arrayRand[i] = arrayRand[j];
    arrayRand[j] = aux;
    x[i].style.height = arrayRand[i] + 'px';
    x[j].style.height = arrayRand[j] + 'px';
}

async function finalEffect(l, r)
{
    for(let i = l; i < r; i++)
    {
        await new Promise(resolveX =>
        {
            changeColor(i, 'purple');
            setTimeout(() => { resolveX(); }, 10);
        });
    }
}

async function middleEffect(l, r)
{
    for(let i = l; i < r; i++)
    {
        await new Promise(resolveY =>
        {
            changeColor(i, 'green');
            setTimeout(() => { resolveY(); }, 5);
        });
    }
}

async function BubbleSort()
{
    let i, j;
    for (i = 0; i < sizeOfArray; i++)
    {
        for (j = 0; j < sizeOfArray - i - 1; j++)
        {
            if (arrayRand[j] > arrayRand[j+1])
            {
                changeColor(j, 'red'); changeColor(j + 1, 'green');
                await new Promise(resolve1 =>
                {
                    swap(j, j+1);
                    setTimeout(() => { resolve1(); }, delay);
                });
            }
            changeColor(j, 'black'); changeColor(j + 1, 'black');
        }
        changeColor(j, 'green');
    }
    await finalEffect(0, sizeOfArray);
}

async function InsertionSort()
{
    let i, j, k;
    for (i = 1; i < sizeOfArray; i++)
    {
        k = arrayRand[i];
        for(j = i - 1; j >= 0 && arrayRand[j] > k; j--)
        {
            await new Promise(resolve1 =>
            {
                arrayRand[j + 1] = arrayRand[j];
                changeColor(j + 1, 'red');
                x[j + 1].style.height = arrayRand[j + 1]+'px';
                setTimeout(() => { resolve1(); }, delay);
            });
            changeColor(j + 1, 'green');
        }
        await new Promise(resolve2 =>
        {
            arrayRand[j+1] = k;
            changeColor(j + 1, 'green');
            x[j+1].style.height = arrayRand[j+1]+'px';
            setTimeout(() => { resolve2(); }, delay);
        });
    }
    await finalEffect(0, sizeOfArray);
}

async function merge(l, r)
{
    let m = Math.floor((l + r) / 2);
    let n1 = m - l + 1, n2 = r - m, i, j, k;
    let L = [], M = [];
    for(i = 0; i < n1; i++)
        L.push(arrayRand[l + i]);
    for(j = 0; j < n2; j++)
        M.push(arrayRand[m + j + 1]);
    i = 0; j = 0; k = l;
    while(i < n1 && j < n2)
    {
        if(L[i] <= M[j])
        {
            await new Promise(resolve1 =>
            {
                changeColor(k, 'green');
                x[k].style.height = L[i] + 'px';
                arrayRand[k] = L[i];
                i++;
                setTimeout(() => { resolve1(); }, delay);
            });
            changeColor(k, 'black');
        }
        else
        {
            await new Promise(resolve2 =>
            {
                changeColor(k, 'red'); changeColor(m + j + 1, 'red');
                arrayRand[k] = M[j];
                x[k].style.height = arrayRand[k] + 'px';
                for(let o = m + j + 1; o > k + 1; o--)
                    x[o].style.height = x[o-1].style.height;
                j++;
                setTimeout(() => { resolve2(); }, delay);
            });
        }
        changeColor(k, 'black'); changeColor(m + j, 'black');
        k++;
    }
    while (i < n1)
    {
        await new Promise(resolve3 =>
        {
            changeColor(k, 'green');
            x[k].style.height = L[i] + 'px';
            arrayRand[k] = L[i];
            i++;
            setTimeout(() => { resolve3(); }, delay);
        });
        changeColor(k, 'black');
        k++;
    }
    while (j < n2)
    {
        await new Promise(resolve4 =>
        {
            changeColor(k, 'red'); changeColor(m + j + 1, 'red');
            arrayRand[k] = M[j];
            x[k].style.height = arrayRand[k] + 'px';
            for(let o = m + j + 1; o > k + 1; o--)
                x[o].style.height = x[o-1].style.height;
            j++;
            setTimeout(() => { resolve4(); }, delay);
        });
        changeColor(k, 'black'); changeColor(m + j, 'black');
        k++;
    }
}

async function MergeSort(l, r)
{
    if (l < r)
    {
        let m = Math.floor((l + r) / 2);
        await MergeSort(l, m);
        await MergeSort(m+1, r);
        for(let i = l; i <= r; i++)
        {
            changeColor(i, 'black');
        }
        await merge(l, r);
        if(l === 0 && r === sizeOfArray - 1)
        {
            await finalEffect(l, r+1);
        }
        else
        {
            await middleEffect(l, r+1);
        }
    }
}

async function HoareQuickSort(l, r)
{
    if (l < r)
    {
        let piv = arrayRand[l];
        let i = l, j = r, count = 0;
        for (let k = l+1; k <= r; k++)
            if (arrayRand[k] <= piv)
                count++;
        let pivInd = l + count;
        await new Promise(resolve1 =>
        {
            changeColor(pivInd, 'yellow');
            swap(l, pivInd);
            setTimeout(() => { resolve1(); }, delay);
        });
        while (i < pivInd && j > pivInd)
        {
            while (arrayRand[i] <= piv) { i++; }
            while (arrayRand[j] > piv) { j--; }
            if (i < pivInd && j > pivInd)
            {
                await new Promise(resolve2 =>
                {
                    changeColor(i, 'green'); changeColor(j, 'red');
                    swap(i, j);
                    setTimeout(() => { resolve2(); }, delay );
                });
                changeColor(i, 'black'); changeColor(j, 'black');
            }
        }
        changeColor(pivInd, 'black');
        await HoareQuickSort(l, pivInd - 1);
        await HoareQuickSort(pivInd + 1, r);
    }
    if(l === 0 && r === sizeOfArray - 1)
        await finalEffect(l, r+1);
    else
        for (let i = 0; i <= r; i++)
            changeColor(i, 'green');
}

async function LomutoQuickSort(l, r)
{
    if (l < r)
    {
        let piv = arrayRand[r];
        let i = l - 1, count = 0;
        for (let k = r - 1; k >= l; k--)
            if (arrayRand[k] >= piv)
                count++;
        let pivInd = r - count;
        changeColor(pivInd, 'yellow');
        for (let j = l; j < r; j++) {
            if (arrayRand[j] <= piv)
            {
                i++;
                await new Promise(resolve1 =>
                {
                    changeColor(i, 'green'); changeColor(j, 'red');
                    swap(i, j);
                    setTimeout(() => { resolve1(); }, delay);
                });
                changeColor(i, 'black'); changeColor(j, 'black');
                changeColor(pivInd, 'yellow');
            }
        }
        i++;
        await new Promise(resolve2 =>
        {
            swap(i, r);
            setTimeout(() => { resolve2(); }, delay);
        });
        changeColor(pivInd, 'black');
        await LomutoQuickSort(l, i - 1);
        await LomutoQuickSort(i + 1, r);
    }
    if(l === 0 && r === sizeOfArray - 1)
        await finalEffect(l, r+1);
    else
        for (let i = 0; i <= r; i++)
            changeColor(i, 'green');
}

async function CocktailSort()
{
    let l = 0, r = sizeOfArray - 1, ok = true;
    while(ok)
    {
        ok = false;
        for (let i = l; i < r; i++)
        {
            if (arrayRand[i] > arrayRand[i + 1])
            {
                ok = true;
                changeColor(i, 'red'); changeColor(i+1, 'green');
                await new Promise(resolve1 =>
                {
                    swap(i, i+1);
                    setTimeout(() => { resolve1(); }, delay);
                });
            }
            changeColor(i, 'black'); changeColor(i+1, 'black');
        }
        changeColor(r, 'green');
        if(!ok)
            break;
        ok = false;
        r--;
        for (let i = r-1; i >= l; i--)
        {
            if (arrayRand[i] > arrayRand[i + 1])
            {
                ok = true;
                changeColor(i+1, 'red'); changeColor(i, 'green');
                await new Promise(resolve2 =>
                {
                    swap(i, i+1);
                    setTimeout(() => { resolve2(); }, delay);
                });
            }
            changeColor(i, 'black'); changeColor(i+1, 'black');
        }
        changeColor(l, 'green');
        l++;
    }
    ok = true;
    while(ok)
    {
        ok = false;
        for (let i = 0; i < sizeOfArray - 1; i++)
        {
            if (x[i].style.backgroundColor === 'green' && x[i + 1].style.backgroundColor === 'black')
            {
                await new Promise(resolve3 =>
                {
                    changeColor(i+1, 'green');
                    setTimeout(() => { resolve3(); }, delay);
                });
                ok = true;
                break;
            }
        }
        ok = false;
        for (let i = 0; i < sizeOfArray - 1; i++)
        {
            if (x[i].style.backgroundColor === 'black' && x[i + 1].style.backgroundColor === 'green')
            {
                await new Promise(resolve4 =>
                {
                    changeColor(i, 'green');
                    setTimeout(() => { resolve4(); }, delay);
                });
                ok = true;
                break;
            }
        }
    }
    await finalEffect(0, sizeOfArray);
}

async function GnomeSort()
{
    let i = 0;
    while (i < sizeOfArray)
    {
        if (i === 0 || arrayRand[i] >= arrayRand[i - 1])
        {
            changeColor(i, 'red');
            await new Promise(resolve1 => { setTimeout(() => { resolve1(); }, delay); });
            changeColor(i, 'green');
            i++;
        }
        else
        {
            changeColor(i - 1, 'red');
            await new Promise(resolve2 =>
            {
                swap(i-1, i);
                setTimeout(() => { resolve2(); }, delay);
            });
            changeColor(i - 1, 'green');
            i--;
        }
    }
    await finalEffect(0, sizeOfArray);
}

async function SelectionSort()
{
    let i, j, idx;
    for( i = 0; i < sizeOfArray - 1; i++)
    {
        idx = i;
        for( j = i + 1; j < sizeOfArray; j++)
        {
            if(arrayRand[idx] > arrayRand[j])
            {
                await new Promise(resolve1 =>
                {
                    changeColor(idx, 'black'); changeColor(j, 'red');
                    idx = j;
                    setTimeout(() => { resolve1(); }, delay);
                });
            }
        }
        await new Promise(resolve2 =>
        {
            swap(i, idx);
            setTimeout(() => { resolve2(); }, delay);
        });
        changeColor(idx, 'black'); changeColor(i, 'green');
    }
    changeColor(sizeOfArray - 1, 'green');
    await finalEffect(0, sizeOfArray);
}

async function PigeonholeSort()
{
    let i, j, r, idx = 0;
    let h = [];
    for(i = 0; i < sizeOfArray; i++)
        arrayRand[i] = Math.floor(arrayRand[i] / 7);
    let min = arrayRand[0], max = arrayRand[0];
    for(i = 0; i < sizeOfArray; i++)
    {
        if(arrayRand[i] > max)
            max = arrayRand[i];
        if(arrayRand[i] < min)
            min = arrayRand[i];
    }
    r = max - min + 1;
    for(i = 0; i < sizeOfArray; i++)
        h[i] = 0;
    for(i = 0; i < sizeOfArray; i++)
        h[arrayRand[i] - min]++;
    for(i = 0; i < r; i++)
    {
        while (h[i] > 0)
        {
            changeColor(idx, 'red');
            arrayRand[idx] = i + min;
            changeColor(idx, 'black');
            idx++;
            h[i]--;
        }
    }
}

function main()
{
    GenerateArray();
    BubbleSort(); //Day 1
    //MergeSort(0, sizeOfArray - 1); //Day 2+3+4
    //HoareQuickSort(0, sizeOfArray - 1); //Day 4
    //LomutoQuickSort(0, sizeOfArray - 1); //Day 4
    //InsertionSort(); //Day 5
    //CocktailSort(); //Day 5
    //GnomeSort(); //Day 6
    //SelectionSort();
    //PigeonholeSort(); //NOT ANIMATED

}
main();