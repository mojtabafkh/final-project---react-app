
import { Link, useNavigate } from "react-router";
import DsButton from "../../components/design-system/DsButton";
import Loading from "../../components/global/Loading";
import PageHeader from "../../components/global/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { getPostsApi } from "../../service/post-service";
import { LucideRefreshCcw } from "lucide-react";

const Posts = () => {
    const navgiate = useNavigate()

    const { data, isLoading, refetch, isFetching} = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPostsApi()
    })

    return (
        <>
            <div className="flex justify-between mb-4 ">
                <PageHeader text="Posts Page" />
                <div className="flex gap-4">
                    <DsButton color="gray" icon={<LucideRefreshCcw />} onClick={refetch}  isLoading={!isLoading && isFetching} tooltip="Refetch"/>
                    <DsButton color="blue" text="Creat" size="lg" onClick={() => navgiate('/app/creatpost')} />
                </div>
            </div>

            {
                isLoading ?
                    <Loading />
                    :
                    <div className="border border-gray-500 h-[80vh] overflow-auto">
                        <table>
                            <thead className="bg-slate-700 sticky top-0">
                                <tr>
                                    <th className="px-2 py-4">Row</th>
                                    <th className="px-2 py-4">Title</th>
                                    <th className="px-2 py-4">User</th>
                                    <th className="px-2 py-4">Body</th>
                                    <th className="px-2 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.posts.map((post, index) => {
                                        return (
                                            <tr key={post.id} className="border border-gray-600 even:bg-gray-800 hover:bg-gray-700">
                                                <td className="p-2 text-lg">{index + 1}</td>
                                                <td className="p-2 text-lg">{post.title}</td>
                                                <td className="p-2 text-lg">{post.userId}</td>
                                                <td className="p-2 text-lg">{post.body}</td>
                                                <td className="p-2 text-lg">
                                                    <Link to={`/app/posts/${post.id}`}>
                                                        <DsButton text="Details" size="md" color="blue" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
            }
        </>

    )
}

export default Posts