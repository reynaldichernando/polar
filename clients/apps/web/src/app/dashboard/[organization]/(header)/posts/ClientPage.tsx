'use client'

import { AbbreviatedBrowserRender } from '@/components/Feed/Markdown/Render/AbbreviatedRender'
import { AnimatedIconButton } from '@/components/Feed/Posts/Post'
import { DashboardBody } from '@/components/Layout/DashboardLayout'
import EmptyLayout from '@/components/Layout/EmptyLayout'
import { StaggerReveal } from '@/components/Shared/StaggerReveal'
import { Chart } from '@/components/Subscriptions/SubscriptionsChart'
import {
  useListArticles,
  useTrafficStatistics,
  useTrafficTopReferrers,
} from '@/hooks/queries'
import { MaintainerOrganizationContext } from '@/providers/maintainerOrganization'
import { getServerURL } from '@/utils/api'
import { prettyReferrerURL } from '@/utils/traffic'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import {
  ArrowForward,
  ArrowForwardOutlined,
  DraftsOutlined,
  LanguageOutlined,
} from '@mui/icons-material'
import { Article } from '@polar-sh/sdk'
import Link from 'next/link'
import { PolarTimeAgo } from 'polarkit/components/ui/atoms'
import Button from 'polarkit/components/ui/atoms/button'
import { Card } from 'polarkit/components/ui/atoms/card'
import ShadowBox from 'polarkit/components/ui/atoms/shadowbox'
import { useContext, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useHoverDirty } from 'react-use'
import { twMerge } from 'tailwind-merge'

const startOfMonth = new Date()
startOfMonth.setUTCHours(0, 0, 0, 0)
startOfMonth.setUTCDate(1)

const startOfMonthThreeMonthsAgo = new Date()
startOfMonthThreeMonthsAgo.setUTCHours(0, 0, 0, 0)
startOfMonthThreeMonthsAgo.setUTCDate(1)
startOfMonthThreeMonthsAgo.setUTCMonth(startOfMonth.getMonth() - 2)

const today = new Date()

function idxOrLast<T>(arr: Array<T>, idx?: number): T | undefined {
  if (idx !== undefined) {
    return arr[idx]
  }
  if (arr.length === 0) {
    return undefined
  }
  return arr[arr.length - 1]
}

const ClientPage = () => {
  const { organization: org } = useContext(MaintainerOrganizationContext)

  const posts = useListArticles({
    organizationId: org.id,
  })
  const infinitePosts =
    posts.data?.pages
      .flatMap((page) => page.items)
      .filter((item): item is Article => Boolean(item)) ?? []

  const [inViewRef, inView] = useInView()

  useEffect(() => {
    if (inView && posts.hasNextPage) {
      posts.fetchNextPage()
    }
  }, [inView, posts])

  const showPosts = infinitePosts.length > 0 && posts.isFetched
  const showNoPostsYet = infinitePosts.length === 0 && posts.isFetched

  const trafficStatistics = useTrafficStatistics({
    organizationId: org.id,
    startDate: startOfMonthThreeMonthsAgo,
    endDate: startOfMonth,
    interval: 'month',
  })

  const [hoveredPeriodIndex, setHoveredPeriodIndex] = useState<
    number | undefined
  >()

  const currentTraffic =
    idxOrLast(trafficStatistics.data?.periods || [], hoveredPeriodIndex)
      ?.views ?? 0

  const referrers = useTrafficTopReferrers({
    organizationId: org.id,
    startDate: startOfMonthThreeMonthsAgo,
    endDate: today,
    limit: 5,
  })

  const prettyReferrerrs = (referrers.data?.items ?? []).map((r) => {
    return { ...r, prettyURL: prettyReferrerURL(r) }
  })

  if (!org.feature_settings?.articles_enabled) {
    return (
      <EmptyLayout>
        <div className="dark:text-polar-200 flex flex-col items-center justify-center space-y-10 py-32 text-gray-600">
          <span className="text-6xl text-blue-400">
            <DraftsOutlined fontSize="inherit" />
          </span>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-medium text-gray-950 dark:text-white">
              Newsletter
            </h2>
            <h2 className="text-lg">
              Create and publish a newsletter to engage with your audience
            </h2>
          </div>
        </div>
      </EmptyLayout>
    )
  }

  return (
    <>
      <DashboardBody>
        <div className="mb-24 flex w-full flex-col-reverse items-start gap-y-12 xl:flex-row xl:gap-x-12 xl:gap-y-0">
          <div className="flex w-full flex-1 flex-col gap-y-8">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-medium text-gray-950 dark:text-white">
                Overview
              </h3>
            </div>
            <div className="flex flex-col gap-y-12">
              <ShadowBox className="flex flex-col gap-y-6">
                <h1 className="text-xl">
                  Newsletters & Posts on Polar will be discontinued
                </h1>
                <ol className="dark:text-polar-500 list-inside text-gray-500">
                  <li>
                    1. We&apos;ll turn it off for new signups and existing
                    customers without any posts
                  </li>
                  <li>
                    2. We&apos;ll reach out to customers with posts to offer
                    exports and support migrating & redirecting them elsewhere
                  </li>
                  <li>
                    3. We&apos;ll sunset it entirely once migrations are done
                  </li>
                </ol>
                <div className="flex flex-row gap-x-2">
                  <Link
                    href={`https://github.com/orgs/polarsource/discussions/3998`}
                    target="_blank"
                  >
                    <Button>Learn more</Button>
                  </Link>
                  <Link
                    href={`${getServerURL()}/api/v1/articles/export?organization_id=${org.id}`}
                    target="_blank"
                  >
                    <Button>Export posts</Button>
                  </Link>
                </div>
              </ShadowBox>

              {showPosts ? (
                <StaggerReveal className="flex w-full flex-col gap-y-4">
                  {infinitePosts.map((post) => (
                    <StaggerReveal.Child key={post.id}>
                      <PostItem {...post} />
                    </StaggerReveal.Child>
                  ))}
                  <div ref={inViewRef} />
                </StaggerReveal>
              ) : null}

              {showNoPostsYet ? (
                <div className="dark:text-polar-500 flex h-full flex-col items-center gap-y-4 pt-32 text-gray-500">
                  <DraftsOutlined fontSize="large" />
                  <div className="flex flex-col items-center gap-y-2">
                    <h3 className="p-2 text-lg font-medium">No posts yet</h3>
                    <p className="dark:text-polar-500 min-w-0 truncate text-gray-500">
                      Create your first post to start engaging with your
                      subscribers
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="lx:overflow-auto flex w-full max-w-[360px] flex-col gap-y-8 overflow-hidden xl:sticky xl:top-8 xl:w-fit xl:flex-shrink-0">
            <h3 className="text-lg font-medium text-gray-950 dark:text-white">
              Analytics
            </h3>
            <div className="flex w-full overflow-x-auto md:overflow-hidden">
              <div className="flex flex-row gap-6 md:overflow-hidden xl:flex-col xl:px-0">
                {trafficStatistics.data && (
                  <Card className="md:min-w-inherit flex w-full min-w-[360px] flex-col gap-y-6 self-stretch p-6">
                    <div className="flex w-full flex-row items-center justify-between">
                      <h3 className="text-sm font-medium">Views</h3>
                      <span className="text-right text-sm">
                        {currentTraffic.toLocaleString()}
                      </span>
                    </div>
                    <Chart
                      y="views"
                      axisYOptions={{
                        ticks: 'month',
                        label: null,
                      }}
                      data={trafficStatistics.data.periods.map((d) => ({
                        ...d,
                        parsedStartDate: new Date(d.start_date),
                      }))}
                      onDataIndexHover={setHoveredPeriodIndex}
                      hoveredIndex={hoveredPeriodIndex}
                    />
                  </Card>
                )}
                {prettyReferrerrs && prettyReferrerrs.length > 0 && (
                  <Card className="justify-top  md:min-w-inherit flex w-full min-w-[300px] flex-col items-start gap-y-3 self-stretch overflow-hidden p-6">
                    <div className="flex w-full flex-row items-center justify-between">
                      <h3 className="text-sm font-medium">Top Referrers</h3>
                    </div>

                    {prettyReferrerrs.map(({ referrer, views, prettyURL }) => (
                      <div
                        key={referrer}
                        className="flex w-full flex-row items-center justify-between gap-x-4 text-sm lg:gap-x-8"
                      >
                        <span className="truncate text-gray-600">
                          {prettyURL}
                        </span>
                        <span>{views.toLocaleString()}</span>
                      </div>
                    ))}
                    <Link
                      className="mt-2 flex flex-row items-center gap-x-2 text-sm text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                      href={`/dashboard/${org.slug}/posts/analytics`}
                    >
                      <span>View Analytics</span>
                      <ArrowForwardOutlined fontSize="inherit" />
                    </Link>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardBody>
    </>
  )
}

export default ClientPage

const PostItem = (post: Article) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const { organization: org } = useContext(MaintainerOrganizationContext)
  const isHovered = useHoverDirty(ref)
  const href = `/dashboard/${org.slug}/posts/${post.slug}`

  return (
    <Link
      className="flex h-full flex-col overflow-hidden"
      ref={ref}
      href={href}
    >
      <div
        className={twMerge(
          'dark:bg-polar-700 dark:hover:bg-polar-800 rounded-4xl flex flex-col justify-between gap-x-8 gap-y-6 bg-gray-50 p-8 shadow-sm transition-colors hover:bg-gray-50',
          post.paid_subscribers_only &&
            'border-white bg-gradient-to-l from-blue-50/80 to-transparent hover:from-blue-100 dark:from-blue-800/20 dark:hover:from-blue-800/30',
        )}
      >
        <div className="flex w-full flex-col gap-y-6">
          <h3 className="text-xl font-medium text-gray-950 dark:text-white">
            {post.title}
          </h3>
          <div className="prose prose-headings:font-medium prose-headings:first:mt-0 prose-p:first:mt-0 prose-img:first:mt-0 prose-p:last:mb-0 dark:prose-pre:bg-polar-800 prose-pre:bg-gray-100 dark:prose-invert prose-pre:rounded-2xl dark:prose-headings:text-white prose-p:text-gray-700 prose-img:rounded-2xl dark:prose-p:text-polar-200 dark:text-polar-200 prose-a:text-blue-500 hover:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300 dark:prose-a:text-blue-400 prose-a:no-underline prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-100 dark:prose-code:bg-polar-700 prose-code:font-normal prose-code:rounded-sm prose-code:px-1.5 prose-code:py-1 w-full max-w-none text-gray-600">
            <AbbreviatedBrowserRender article={post} />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between whitespace-nowrap">
          <div className="dark:text-polar-300  flex w-full flex-row flex-wrap gap-x-3 text-sm text-gray-500">
            {post.published_at && new Date(post.published_at) <= new Date() ? (
              <PolarTimeAgo date={new Date(post.published_at)} />
            ) : (
              <>
                {post.published_at ? (
                  <span>
                    {post.notify_subscribers
                      ? 'Publishing and sending in'
                      : 'Publishing in'}{' '}
                    <PolarTimeAgo
                      date={new Date(post.published_at)}
                      suffix=""
                    />
                  </span>
                ) : (
                  <span>Not scheduled</span>
                )}
              </>
            )}
            &middot;
            {post.visibility !== 'public' ? (
              <div className="flex flex-row items-center gap-x-2 text-sm">
                <span className="capitalize">{post.visibility}</span>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-x-2 text-sm">
                {post.paid_subscribers_only ? (
                  <div className="flex flex-row items-center rounded-full bg-blue-50 bg-gradient-to-l px-2 py-0.5 dark:bg-blue-950">
                    <span className="text-xs text-blue-300 dark:text-blue-300">
                      Premium
                    </span>
                  </div>
                ) : (
                  <>
                    <LanguageOutlined
                      className="text-blue-500"
                      fontSize="inherit"
                    />
                    <span className="capitalize">Public</span>
                  </>
                )}
              </div>
            )}
            {post.is_pinned ? (
              <>
                &middot;
                <div className="flex flex-row items-center gap-x-2 text-sm">
                  <div className="flex flex-row items-center rounded-full bg-green-100 bg-gradient-to-l px-2 py-0.5 dark:bg-green-950">
                    <span className="text-xs text-green-400 dark:text-green-300">
                      Pinned
                    </span>
                  </div>
                </div>
              </>
            ) : null}
            {post.email_sent_to_count ? (
              <>
                &middot;
                <div className="flex flex-row items-center gap-x-2 text-sm">
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>
                    {post.email_sent_to_count}{' '}
                    {post.email_sent_to_count === 1 ? 'receiver' : 'receivers'}
                  </span>
                </div>
              </>
            ) : null}
          </div>

          <div className="hidden flex-row items-center gap-x-4 lg:flex">
            <AnimatedIconButton active={isHovered} variant="secondary">
              <ArrowForward fontSize="inherit" />
            </AnimatedIconButton>
          </div>
        </div>
      </div>
    </Link>
  )
}
