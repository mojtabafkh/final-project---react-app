import { useParams } from "react-router";
import DsTypography from "../../../components/design-system/DsTypography";
import Loading from "../../../components/global/Loading";
import PageHeader from "../../../components/global/PageHeader";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../../types/post";
import { getPostApi } from "../../../service/post-service";


const PostDetails = () => {

    const { postId } = useParams()

    const { data, isLoading } = useQuery<Post>({
        queryKey: [`post-details-${postId}`],
        queryFn: () => getPostApi(Number(postId))
    })


    return (
        <>
            <PageHeader text={`Post - ${postId}`} element="h2" showBack backRoute="/app/posts" />

            {
                isLoading ?
                    <Loading />
                    :
                    <div className="bg-gray-700 p-4 rounded-lg w-1/2">
                         <DsTypography element="h1" className="text-2xl font-bold mb-4">{data?.title || '-'}</DsTypography>
                        <DsTypography element="p" className="text-xl">{data?.body || '-'}</DsTypography>
                    </div>
            }
        </>
    )
}

export default PostDetails