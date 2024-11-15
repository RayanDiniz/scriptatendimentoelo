const path = require('path'); // Módulo Node.js para trabalhar com caminhos de arquivos
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin para gerar HTML automaticamente
const webpack = require('webpack'); // Para configurar plugins adicionais

module.exports = {
  // Define o arquivo de entrada principal
  entry: './src/index.js', 

  // Configura o local de saída do bundle gerado
  output: {
    filename: 'bundle.js', // Nome do arquivo gerado
    path: path.resolve(__dirname, 'dist'), // Pasta onde será salvo
    clean: true, // Limpa o conteúdo da pasta 'dist' antes de gerar um novo build
  },

  // Configurações do servidor de desenvolvimento
  devServer: {
    static: './dist', // Pasta servida pelo servidor de desenvolvimento
    port: 3000, // Porta padrão
    hot: true, // Habilita hot-reloading
  },

  // Configurações de resolução de módulos
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve arquivos JS e JSX sem precisar especificar extensão
    fallback: {
      stream: require.resolve('stream-browserify'),
      fs: false,
      path: require.resolve('path-browserify'),
      zlib: require.resolve('browserify-zlib'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url/'),
      events: require.resolve('events/'),
    },
  },

  // Loaders para processamento de diferentes tipos de arquivos
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Aplica este loader a arquivos JS e JSX
        exclude: /node_modules/, // Ignora a pasta 'node_modules'
        use: {
          loader: 'babel-loader', // Usa Babel para transpilar código
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Presets para React e ES6+
          },
        },
      },
      {
        test: /\.css$/, // Para processar arquivos CSS
        use: ['style-loader', 'css-loader'], // Aplica loaders na ordem: style > css
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // Para importar imagens
        type: 'asset/resource',
      },
    ],
  },

  // Plugins para adicionar funcionalidades ao Webpack
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Usa este arquivo HTML como base
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser', // Polyfill para `process` no navegador
      Buffer: ['buffer', 'Buffer'], // Polyfill para `Buffer`
    }),
  ],

  // Modo de operação: 'development' ou 'production'
  mode: 'development',
};
