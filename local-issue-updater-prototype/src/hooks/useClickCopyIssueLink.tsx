'use client';
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const useClickCopyIssueLink = () => {
    const adjustCopiedUrl = (inputUrl: string) => {
        let newUrl = ""
        // Remove "admin-cms-page"
        newUrl = inputUrl.replace(/admin-cms-page/g, '');

        // Remove "issue-detail" and everything that follows until the last occurrence
        var regex = /issue-detail(.*?)(issue-detail|$)/g;
        newUrl = newUrl.replace(regex, '');

        return newUrl;
    }

    const pathName = usePathname()
    const onClickCopyLink = (id: string) => {
        const origin =
            typeof window !== 'undefined' && window.location.origin
                ? window.location.origin
                : '';

        const URL = `${origin}${pathName}`;
        navigator.clipboard.writeText(adjustCopiedUrl(URL) + `issue-preview/${id}`)
        setIsCopied(true)
    }
    const clearCopyTick = () => {
        setIsCopied(false);
    }
    const [isCopied, setIsCopied] = useState(false);
    return {
        onClickCopyLink,
        isCopied,
        clearCopyTick,
    }
}

export default useClickCopyIssueLink