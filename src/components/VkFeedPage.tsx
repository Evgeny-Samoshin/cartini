/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { RefreshCw, Heart, Eye, MessageSquare, AlertTriangle, ExternalLink } from 'lucide-react';
import { VKPost } from '../types';
import { VK_FEED } from '../data';

export default function VkFeedPage() {
  const [posts, setPosts] = useState<VKPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [apiError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Initialize simulated fetch
  useEffect(() => {
    simulateFetch();
  }, [apiError]);

  const simulateFetch = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (apiError) {
        setPosts([]);
      } else {
        setPosts(VK_FEED);
      }
      setIsLoading(false);
    }, 1200);
  };

  const handleLoadMore = () => {
    setIsMoreLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, posts.length));
      setIsMoreLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-bg-warm py-16">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">Живая лента</span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-tight">
              Новости CARTINI и заметки о текстиле
            </h1>
            <p className="text-secondary text-sm mt-3 leading-relaxed">
              Практические заметки о тканях, затемнении, комплектации объектов и новых проектах. Ленту можно подключить к VK API после получения данных сообщества.
            </p>
          </div>

        </div>

        {/* Loading Skeleton States (серые прямоугольники) */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm p-5 space-y-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg w-full" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-4/5" />
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : apiError ? (
          /* Error State API VK */
          <div className="max-w-xl mx-auto text-center py-16 bg-white rounded-xl border border-red-100 p-8 shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-serif font-bold text-red-600 mb-2">Не удалось загрузить новости</h3>
            <p className="text-secondary text-sm leading-relaxed mb-6">
              Из-за ограничений локальной сети или API ВКонтакте лента временно недоступна. Вы можете прочитать все актуальные новости и проекты непосредственно в нашей группе в социальной сети VK.
            </p>
            <a
              href="https://vk.com/sewing_saratov_manufacturing"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="h-11 px-6 rounded bg-primary text-white hover:bg-gray-800 font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              Перейти в группу ВКонтакте
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ) : (
          /* Real Data Feed Grid */
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.slice(0, visibleCount).map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Media */}
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt="Блог фото"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                        VK.com / Новости
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="text-[11px] text-gray-400 font-medium mb-2">{post.date}</div>
                      <p className="text-primary text-sm font-bold line-clamp-3 mb-4 font-serif">
                        {post.text}
                      </p>
                      <p className="text-secondary text-xs leading-relaxed line-clamp-4">
                        {post.postTextFull}
                      </p>
                    </div>
                  </div>

                  {/* Indicators Footer */}
                  <div className="px-5 pb-5 pt-4 border-t border-gray-50 flex items-center justify-between text-secondary">
                    <div className="flex items-center gap-4 text-xs font-medium">
                      <span className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                        <Heart className="h-4 w-4 hover:fill-red-500" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {post.comments}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {post.views}
                      </span>
                      <a
                        href={`https://vk.com/wall-sewing_saratov_${post.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        className="text-accent font-bold hover:underline inline-flex items-center gap-1 text-[11px] uppercase tracking-wider"
                      >
                        ВК
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Load More button */}
            {visibleCount < posts.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={isMoreLoading}
                  className="h-11 px-8 rounded border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isMoreLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Загрузка...
                    </>
                  ) : (
                    'Загрузить ещё посты'
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Brand visual CTA layout */}
        <div className="mt-20 p-8 rounded-2xl bg-primary text-white border-l-4 border-accent flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent font-serif font-bold text-xl shrink-0">
              vk
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif">Подписывайтесь на нас ВКонтакте</h3>
              <p className="text-xs text-gray-400 leading-relaxed mt-0.5 max-w-xl">
                Мы ежедневно делимся деталями закроя, новыми рулонами тканей из Турции, пошивом ресторанной формы и акциями.
              </p>
            </div>
          </div>
          <a
            href="https://vk.com/sewing_saratov_manufacturing"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="h-11 px-6 rounded bg-accent text-white hover:bg-accent-hover font-bold text-xs uppercase tracking-wider flex items-center justify-center cursor-pointer whitespace-nowrap"
          >
            Подписаться на группу
          </a>
        </div>
      </div>
    </div>
  );
}
