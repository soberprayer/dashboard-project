import partner1 from '../../assets/kumiyun.jpg'
import partner2 from '../../assets/sdufe.webp'
import partner3 from '../../assets/牢大.jpg'
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-[30vw] h-[30vw] max-w-[520px] max-h-[520px] bg-blue-200 opacity-30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[25vw] h-[25vw] max-w-[420px] max-h-[420px] bg-blue-400 opacity-20 rounded-full blur-2xl -z-10" />
      <div className="absolute top-1/2 left-1/2 w-[42vw] h-[12vw] max-w-[760px] max-h-[240px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-300/30 to-transparent rounded-3xl blur-2xl -z-10" />

      {/* 主要内容区域 */}
      <div
        className="w-[78vw] max-w-[1280px] mx-auto p-0 md:p-0 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-xl border border-blue-100 relative z-10 flex flex-col"
        style={{
          height: '78vh',
          minHeight: '620px',
          maxHeight: '92vh',
          marginTop: '1vh', // 向上再偏移一点
        }}
      >
        {/* 顶部品牌与介绍 */}
        <div className="flex flex-col md:flex-row h-[30%] w-full">
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-6 bg-white/0">
            <h1 className="text-5xl font-extrabold text-blue-700 mb-3 drop-shadow-sm tracking-tight">数据平台</h1>
            <span className="text-gray-600 text-lg md:text-xl mb-2">安全访问 · 智能管理 · 数据洞察</span>
            <span className="text-gray-400 text-sm md:text-base">为企业打造一站式数据资产解决方案</span>
          </div>
          {/* 品牌与合作方 */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-6 bg-white/0">
            <div className="flex gap-6 items-center mb-3">
            <img src={partner1} alt="Partner1" width={40} height={40} />
<img src={partner2} alt="Partner2" width={40} height={40} />
<img src={partner3} alt="Partner3" width={40} height={40} />
            </div>
            <span className="text-sm text-gray-400">合作伙伴技术支持</span>
          </div>
        </div>

        {/* 登录/注册表单区域 */}
        <div className="flex-1 flex items-center justify-center px-8 py-6 w-full" style={{overflow: 'visible'}}>
          <div className="w-full max-w-3xl">
            {children}
          </div>
        </div>

        {/* 帮助和底部信息 */}
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-3 bg-white/0 border-t border-gray-100 text-sm">
          <div className="text-gray-500 mb-1 md:mb-0">
            登录遇到问题？
            <a href="mailto:support@dataplat.com" className="text-blue-500 underline ml-1">联系我们</a>
            <span className="mx-1">|</span>
            <a href="/help" className="text-blue-500 underline ml-1">帮助中心</a>
          </div>
          <div className="text-gray-400 text-sm text-center">
            <span>© 2024 数据平台. All rights reserved.</span>
            <span className="ml-3">版本号 v1.2.3 | 备案号 京ICP备12345678号</span>
          </div>
        </div>
      </div>
    </div>
  );
}