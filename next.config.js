/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["testsk2.ru"],
  // },
  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "https://testsk2.ru" },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "http://testsk2.ru/:path*",
  //     },
  //   ];
  // },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader"],
    });
    return config;
  },

  turbopack: {
    rules: {
      "*.{glsl,vs,fs,vert,frag}": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  }
};

module.exports = nextConfig;
