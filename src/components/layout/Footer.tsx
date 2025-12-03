import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 고객센터 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">고객센터</h3>
            <p className="text-sm text-gray-600">문의: support@cobuy.local</p>
          </div>

          {/* 약관 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">약관</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-600">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-600">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>

          {/* SNS 링크 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">소셜</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary-600">
                Instagram
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>© 2024 동네 Co-Buy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

