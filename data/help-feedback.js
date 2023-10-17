const fromData = {
	all: { apiKey: 'listPagesion', label: '全部问题' },
	me: { apiKey: 'listMePagesion', label: '我的问题' },
	meReply: { apiKey: 'listMeReplyPagesion', label: '我的回复' },
};

const getFormData = (from) => fromData[from] || fromData.all;

/**
 * @readonly
 * @enum {string}
 */
const TagColor = {
	bug: 'graph-4',
	建议: 'graph-3',
	功能: 'graph-2',
	文档: 'graph-1',
	帮助: 'graph-0',
};

export { fromData, getFormData, TagColor };
