var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
// var bodyParser = require('body-parser');
var app = express();
var formidable = require('formidable');

//验证
var jwt = require('jsonwebtoken');
var miyao = 'iloveyou'
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// router.get('*', function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin','*');
//     next();
// });

// 获取电影详情
app.get('/getFilm', (req, res) => {
    fs.readFile('./dataFilm.json', (err, data) => {
        var arr = JSON.parse(data.toString())
        res.json(arr)
    })
});

// 获取首页（热映、上映）
app.get('/getHome', (req, res) => {
    fs.readFile('./dataHome.json', (err, data) => {
        var arr = JSON.parse(data.toString())
        res.json(arr)
    })
});
// 获取影院首页
app.get('/getCinema', (req, res) => {
    fs.readFile('./dataCinema.json', (err, data) => {
        var arr = JSON.parse(data.toString())
        res.json(arr)
    })
});
//根据数据返回对应影院及电影
app.post("/getCinemaMovie", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var where = fields
        fs.readFile('./dataCinema.json', (err, data) => {
            var arr = JSON.parse(data.toString())
            for (var i = 0; i < arr.cinema.length; i++) {
                if (arr.cinema[i].title === where.title) {
                    res.json(arr.cinema[i])
                }
            }
        })
    })
});
// 定位
app.get('/getCity', (req, res) => {
    fs.readFile('./city.json', (err, data) => {
        var arr = JSON.parse(data.toString())
        res.json(arr)
    })
});
// 搜索
app.post('/search', (req, res) => {
    // var str = '皮卡丘'
    // var str = req.body
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log("搜索", fields)
        var str = fields
        fs.readFile('./dataFilm.json', (err, data) => {
            if (err) {
                res.json({ "msg": "no" })
            }
            var arr = JSON.parse(data.toString())
            let arr1 = arr.movieDetails
            let arr2 = []
            arr1.forEach(item => {
                if (str.val === '') return;
                if (item.title.includes(str.val)) {
                    arr2.push(item)
                }
            });
            // console.log("arr2",arr2)
            res.json(arr2)
        })
    })
});

//登录  注册
function rmdir(dir, callback) {
    // 传要删除的文件夹 不是string
    fs.readdir(dir, (err, files) => {
        // index 是 读取files下标
        function next(index) {
            // 如果没有文件或 文件夹 直接将这个文件删掉
            if (index == files.length) return fs.rmdir(dir, callback)
            // console.log(files.length)
            let newPath = path.join(dir, files[index])
            fs.stat(newPath, (err, stat) => {
                if (stat.isDirectory()) {
                    // 有文件夹 进这个文件夹
                    rmdir(newPath, () => {
                        next(index + 1)
                    })
                } else {
                    // 删文件
                    fs.unlink(newPath, () => {
                        next(index + 1)
                    })
                }
            });
        }
        next(0)
    })
}
app.use(express.static('www'))
app.post('/uploadimg', (req, res) => {
    var form = new formidable.IncomingForm();
    // // 将图片上传至 临时文件夹 uploads 或者 temp
    form.uploadDir = path.resolve(__dirname, './www/uploads');
    form.keepExtensions = true; // 保留拓展名

    form.parse(req, function (err, fields, files) {
        // //将上传后的文件名返回出去
        console.log(files);
        res.send(path.parse(files.file.path).base)
    })
})
app.post('/add', (req, res) => {
    let id = ''
    let str = '12345671475289sdfghjkxlkjhasdfghjkzxvbnwertyuio00plmjh'
    let i = 10;
    while (i) {
        id += str[~~(Math.random() * str.length)]
        i--
    }
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        fs.readFile('./data.json', (err, data) => {
            var arr = JSON.parse(data.toString()).list
            var username = fields.username
            var pwd = fields.pwd
            let imageUrl = fields.imageUrl
            console.log(imageUrl)
            var boolean = arr.some(item => {
                return item.username === username
            });
            // 根据id创建文件夹
            fs.mkdirSync(path.resolve(__dirname, './www/img/' + id));
            var obj = {
                username,
                pwd,
                imageUrl: '/img/' + id + '/' + imageUrl,
            }
            // arr.push(obj)
            fs.renameSync(
                // 读取临时文件
                path.resolve(__dirname, './www/uploads/' + imageUrl),
                // 改路径
                path.resolve(__dirname, './www/img/' + id + '/' + imageUrl)
            )
            if (boolean) {
                res.json({ msg: "用户信息已注册" })
            } else {
                // console.log(arr)
                arr.push(obj)
                fs.writeFile("./data.json", JSON.stringify({ list: arr }), (err) => {
                    res.json({ msg: "ok" })
                })
            }
        })
    })
});
app.post('/login', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        console.log("fields", fields)
        var username = fields.username;
        var pwd = fields.pwd;
        fs.readFile('./data.json', (err, data) => {
            var arr = JSON.parse(data.toString()).list;
            var boolean = arr.some(item => {
                return item.username === username && item.pwd === pwd
            })
            var boolean1 = arr.some(item => {
                return item.username === username && item.pwd != pwd
            })
            console.log(boolean1)
            if (boolean) {
                let token = jwt.sign({ username, pwd }, miyao, { expiresIn: 6000000 })
                res.json({ msg: "ok", token, "title": "ok" })
            } else if (boolean1) {
                res.json({ msg: "error", "title": "pwderr" })
            } else {
                res.json({ msg: "error", "title": "NotUser" })
            }
        })
    })
});
app.post('/islogin', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let token = fields.token;
        // jwt.verify 解密 token
        jwt.verify(token, miyao, (error, decode) => {
            if (error) {
                res.json({ msg: 'error' });
                return;
            }
            //
            let username = decode.username;
            fs.readFile('./data.json', (err, data) => {
                var arr = JSON.parse(data.toString()).list
                var userinfo = arr.filter(item => item.username === username)
                res.json({ userinfo: userinfo[0] })
            })
        })
    })
})





app.post('/img', (req, res) => {
    var form = new formidable.IncomingForm();
    // 将图片上传至 临时文件夹 uploads 
    form.uploadDir = path.resolve(__dirname, './www/uploads');
    form.keepExtensions = true; // 保留拓展名
    form.parse(req, function (err, fields, files) {
        //将上传后的文件名返回出去
        let lujing = fields.lujing;
        res.send([path.parse(files.file.path).base, lujing])
    })
})

app.post('/addFilm', (req, res) => {
    let id = ''
    let str = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    let i = 10;
    while (i) {
        id += str[~~(Math.random() * str.length)]
        i--
    }
    // console.log("1111111")
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let cover0 = fields.from.cover
        let dirImg0 = fields.from.dirImg
        let actImg1 = fields.from.actImg1
        let actImg2 = fields.from.actImg2
        let actImg3 = fields.from.actImg3
        let actImg4 = fields.from.actImg4

        // console.log("fields.from",fields.from)
        let title = fields.from.title
        let tag = fields.from.tag
        let act = [fields.from.dir, fields.from.actName1, fields.from.actName2, fields.from.actName3, fields.from.actName4]
        let year = fields.from.year
        let place = fields.from.place
        let duration = fields.from.duration
        let dir = fields.from.dir
        let desc = fields.from.desc
        let scenes = [fields.from.scenes1, fields.from.scenes2]
        let type = fields.from.type
        let like = fields.from.like
        let score = fields.from.score
        let cover = '/moviePictures/' + id + '/' + fields.from.cover


        let act_s = [
            { "name": fields.from.dir, "shi": fields.from.dirShi, "image": '/moviePictures/' + id + '/' + fields.from.dirImg },
            { "name": fields.from.actName1, "shi": fields.from.actShi1, "image": '/moviePictures/' + id + '/' + fields.from.actImg1 },
            { "name": fields.from.actName2, "shi": fields.from.actShi2, "image": '/moviePictures/' + id + '/' + fields.from.actImg2 },
            { "name": fields.from.actName3, "shi": fields.from.actShi3, "image": '/moviePictures/' + id + '/' + fields.from.actImg3 },
            { "name": fields.from.actName4, "shi": fields.from.actShi4, "image": '/moviePictures/' + id + '/' + fields.from.actImg4 }]

        fs.readFile('./dataFilm.json', (err, data) => {
            var arr = JSON.parse(data.toString()).movieDetails

            // 根据id创建文件夹
            fs.mkdirSync(path.resolve(__dirname, './www/moviePictures/' + id));
            var obj = {
                title,
                id,
                tag,
                act,
                year,
                place,
                duration,
                dir,
                desc,
                scenes,
                type,
                like,
                score,
                cover,
                act_s,
            }
            // console.log("obj",obj)
            arr.push(obj)
            // console.log("arr",arr)
            // console.log("cover",cover)
            fs.renameSync(
                // 读取临时文件
                path.resolve(__dirname, './www/uploads/' + cover0),
                // 改路径
                path.resolve(__dirname, './www/moviePictures/' + id + '/' + cover0)
            )
            fs.renameSync(
                path.resolve(__dirname, './www/uploads/' + dirImg0),
                path.resolve(__dirname, './www/moviePictures/' + id + '/' + dirImg0),
            )
            fs.renameSync(
                path.resolve(__dirname, './www/uploads/' + actImg1),
                path.resolve(__dirname, './www/moviePictures/' + id + '/' + actImg1),
            )
            fs.renameSync(
                path.resolve(__dirname, './www/uploads/' + actImg2),
                path.resolve(__dirname, './www/moviePictures/' + id + '/' + actImg2),
            )
            fs.renameSync(
                path.resolve(__dirname, './www/uploads/' + actImg3),
                path.resolve(__dirname, './www/moviePictures/' + id + '/' + actImg3),
            )
            fs.renameSync(
                path.resolve(__dirname, './www/uploads/' + actImg4),
                path.resolve(__dirname, './www/moviePictures/' + id + '/' + actImg4),
            )

            fs.writeFileSync('./dataFilm.json', JSON.stringify({ movieDetails: arr }))
            res.json({ movieDetails: arr })
        })
    })
})

function rmdir(dir, callback) {
    // 传要删除的文件夹 不是string
    fs.readdir(dir, (err, files) => {
        // index 是 读取files下标
        function next(index) {
            // 如果没有文件或 文件夹 直接将这个文件删掉
            if (index == files.length) return fs.rmdir(dir, callback)
            // console.log(files.length)
            let newPath = path.join(dir, files[index])
            fs.stat(newPath, (err, stat) => {
                if (stat.isDirectory()) {
                    // 有文件夹 进这个文件夹
                    rmdir(newPath, () => {
                        next(index + 1)
                    })
                } else {
                    // 删文件
                    fs.unlink(newPath, () => {
                        next(index + 1)
                    })
                }
            });
        }
        next(0)
    })
}

app.post('/del', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let id = fields.id;
        // console.log("id:", id);
        fs.readFile('./dataFilm.json', (err, data) => {
            var arr = JSON.parse(data.toString()).movieDetails
            // 删数据
            var result = arr.filter(item => item.id != id);
            // 获取要删除的文件夹路径
            var lujing = path.resolve(__dirname, './www/moviePictures/' + id)
            fs.writeFile('./dataFilm.json', JSON.stringify({ movieDetails: result }), (err) => {
                res.json({ movieDetails: result })
            });
            rmdir(lujing, () => {
                console.log('文件删除完毕!!!');
            })
        });
    })
})



module.exports = router;
// app.use(express.static('www'))

app.listen(3000, () => {
    console.log(3000);
})