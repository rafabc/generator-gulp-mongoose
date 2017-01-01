'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


// mongoose connection requires
var express = require('express');
var app = express();                              // create our app w/ express
var mongoose = require('mongoose');               // mongoose for mongodb
var port = process.env.PORT || 8080;              // set the port
var database = require('./config/database');      // load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var x = "";


module.exports = yeoman.generators.Base.extend({
  
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    // This makes `appname` a required argument.
    this.argument('appname', { type: String, optional: true, desc: 'Nombre del proyecto', defaults: '' } );
    
    // And you can then access it later on this way; e.g. CamelCased
    //this.appname = this.appname;


    mongoose.connect(database.localUrl);  // Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

    this.log(yosay(
      chalk.yellow('Conexión establecida con mongo')
    ));
    

    var pars = mongoose.model('parameters', { name: String });

   

    pars.find({ name: 'valuepar' }, function(err, parameters) {
      if (err) throw err;


      console.log(yosay(
        chalk.yellow('parameters' + parameters)
      ));


      x = parameters[0].name;

    });

            
    this.log(yosay(
      chalk.yellow('Parrameters:' + x)
    ));




    /*  CARGA DE UN PARAMETRO NUEVO EN MONGO - TESTEADO FUNCIONA OK*/
    var newPar = new pars({ name: 'par3' });
    newPar.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('new parameter inserted');
      }
    });
    


  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },

  prompting: function () {
    var done = this.async();
	
    console.log(getChalkMsg(this.pkg.version));

    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.yellow('Yeoman generator with  GULP and Mongoose   Powered By GFI')
    ));

    var prompts = [{
        type: 'input',
        name: 'projectName',
        default: 'proyecto',
        message: 'Indica el nombre del proyecto'
    }];

    if(this.appname === '') {
      this.prompt(prompts, function (props) {
          this.projectName = this._.slugify(props.projectName);
          done();
      }.bind(this));
    } else {
      this.projectName = this.appname;
      done();
    }


  },

  writing: {
    app: function () {
      this.mkdir('app');
      this.mkdir('test');
      this.mkdir('assets/img');
      this.mkdir('app/common');
      this.mkdir('app/common/footer/');
      this.mkdir('app/common/footer/js/');
      this.mkdir('app/common/footer/views/');

      this.mkdir('app/common/header/');
      this.mkdir('app/common/header/js/');
      this.mkdir('app/common/header/views/');


      this.mkdir('app/todo');
      this.mkdir('app/todo/js/');
      this.mkdir('app/todo/views/');

      this.copy('test/ejemplo-test.js', 'test/ejemplo-test.js');

      this.copy('assets/img/gfi.jpg', 'assets/img/gfi.jpg');
      this.copy('assets/img/favicon.ico', 'assets/img/favicon.ico');
      this.copy('assets/img/favicon.jpg', 'assets/img/favicon.jpg');
      this.copy('assets/img/logo-gfi.png', 'assets/img/logo-gfi.png');

      this.copy('assets/scss/main.scss', 'assets/scss/main.scss');
      this.copy('assets/scss/_vars.scss', 'assets/scss/_vars.scss');
      
      this.copy('app/index.jade', 'app/index.jade');
      this.copy('app/index.js', 'app/index.js');
      this.copy('app/app.js', 'app/app.js');


      this.copy('app/todo/views/main.jade', 'app/todo/views/main.jade');
      this.copy('app/todo/js/todoCtrl.js', 'app/todo/js/todoCtrl.js');
      
      this.copy('app/common/footer/views/footer.jade', 'app/common/footer/footer.jade');
      this.copy('app/common/footer/js/footerCtrl.js', 'app/common/footer/js/footerCtrl.js');

      this.copy('_gulpfile.js', 'gulpfile.js');
      this.copy('_karma.conf.js', 'karma.conf.js');
      this.template('_bower.json', 'bower.json');
      this.template('_package.json', 'package.json');
      
      this.copy('README.md', 'README.md');      

    },

    projectfiles: function () {
      this.copy('gitignore', '.gitignore');
      this.copy('editorconfig', '.editorconfig');
      this.copy('_jshintrc', '.jshintrc');
      this.copy('scss-lint.yml', '.scss-lint.yml');
      this.copy('_bowerrc', '.bowerrc');
      this.copy('app/buildignore', 'app/.buildignore');
    }
  },

  install: function () {

    console.log('xxx' + x);

    this.installDependencies({bower: false, npm: false});
  },

  end: function() {
    this.log('\n');    
    this.log('\n');
    this.log(chalk.cyan('A continuacion ejecuta los siguientes pasos'));
    this.log('\n');
    this.log('1 - Instalacion de dependencias - ejecuta: ' + chalk.green('bower install'));
    this.log('\n');
    this.log('2 - Comprueba el resultado de la creacion del proyecto - ejecuta: ' + chalk.yellow('gulp test'));
    this.log('\n');
    this.log('3- Lanza la aplicacion - ejecuta: ' + chalk.green('gulp server'));
  }
});

function getChalkMsg(version) {
    var chalkMsg =
    chalk.white( '\n  ╔══════════╗   ╔══════════   ══════╦═════') +
    chalk.white( '\n  ║          ║   ║                   ║') +
    chalk.green( '\n  ║          ║   ║                   ║') +
    chalk.green( '\n  ║              ╠══════════         ║') +
    chalk.green( '\n  ║              ║                   ║') +
    chalk.green( '\n  ║      ════╗   ║                   ║') +
    chalk.yellow('\n  ║          ║   ║                   ║') +
    chalk.yellow('\n  ║          ║   ║                   ║') +
    chalk.yellow('\n  ╚══════════╝   ║             ══════╩═════') +
    chalk.green('\n GFI Base utilizando GULP ') +
    chalk.white('v' + version + '. ') + chalk.yellow('Powered by Yeoman\n\n');
    return chalkMsg;
}

/*
205  - ═
200  - ╚
186  - ║
201  - ╔
188  - ╝
187  - ╗
204  - ╠
202  - ╩
203  - ╦
*/