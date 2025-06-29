import { NextResponse } from 'next/server';

/**
 * Next.js 中间件
 * 用于处理跨域请求和请求日志记录
 */
export function middleware(request) {
  // 获取响应对象
  const response = NextResponse.next();
  
  // 设置CORS头
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // 记录请求日志
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`);
  
  return response;
}

// 配置中间件应用的路径
export const config = {
  matcher: '/api/:path*',
};