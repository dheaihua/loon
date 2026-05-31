local center = import 'center.libsonnet';
local color = import 'color.libsonnet';
local fontSize = import 'fontSize.libsonnet';
local utils = import 'utils.libsonnet';

local getToolBar(theme) = {
  // 工具栏文本样式生成函数
  local makeToolbarTextStyle(text) = utils.makeTextStyle({
    text: text,
    fontSize: fontSize['工具栏按键字体大小'],
    normalColor: color[theme]['工具栏按键前景颜色'],
    highlightColor: color[theme]['工具栏按键前景颜色'],
    center: center['toolbar按键偏移'],
		fontWeight: "medium"
  }),
  
  preeditStyle: {
    insets: {
      left: 8,
      top: 2,
    },
    backgroundStyle: 'preeditBackgroundStyle',
    foregroundStyle: 'preeditForegroundStyle',
  },
  preeditBackgroundStyle: {
    buttonStyleType: 'fileImage',
    normalImage: {
      file: 'bg',
      image: 'IMG1',
    },
  },
  preeditForegroundStyle: {
    textColor: color[theme]['候选字体未选中字体颜色'],
    fontSize: fontSize['preedit区字体大小'],
    fontWeight: 0,
  },

  toolbarStyle: {
    // insets: { left: 50, right: 50 },
    backgroundStyle: 'toolbarBackgroundStyle',

    // menuButtonStyle: 'menuButtonStyle',
    // secondaryButtonStyle: [
    //   'closeButtonStyle',  // 收起键盘
    //   'simp2tranButtonStyle',  // 预测
    //   'scriptButtonStyle',  // 脚本
    //   'pasteboardButtonStyle',  // 剪贴板
    //   'phraseeButtonStyle',  // 常用语
    //   'emojiButtonStyle',  // emoji
    //   'translateButtonStyle',  // 翻译
    // ],
    // horizontalCandidateStyle: 'horizontalCandidateStyle',
    // verticalCandidateStyle: 'verticalCandidateStyle',
  },
  // 工具栏布局
  toolbarLayout: [
    {
      HStack: {
        subviews: [
          // 工具栏会和其他键盘合并在一起，这里按键名称添加前缀以防冲突
          { Cell: 'toolbarMenuButton' },
          { Cell: 'toolbarTranslateButton' },
          { Cell: 'toolbarEmojiButton' },
          { Cell: 'toolbarPhraseeButton' },
          { Cell: 'toolbarPasteboardButton' },
          { Cell: 'toolbarScriptButton' },
          { Cell: 'toolbarSimp2tranButton' },
          { Cell: 'toolbarCloseButton' },
        ],
      },
    },
  ],
  toolbarBackgroundStyle: {
    buttonStyleType: 'fileImage',
    normalImage: {
      file: 'bg',
      image: 'IMG2',
    },
    highlightImage: {
      file: 'bg',
      image: 'IMG2',
    },
  },
  // 工具栏按键背景样式
  toolbarButtonBackgroundStyle: {
    buttonStyleType: 'geometry',
    normalColor: '#00000001',
    highlightColor:'#00000001',
  },

  // 占位空按键
  toolbarPlaceholderButton: {
  },

  toolbarMenuButton: {
    backgroundStyle: 'toolbarButtonBackgroundStyle',
    foregroundStyle: 'toolbarMenuButtonForegroundStyle',
    action: {
      shortcut: '#keyboardMenu',
    },
  },
  toolbarMenuButtonForegroundStyle: makeToolbarTextStyle('菜单'),

  toolbarTranslateButton: {
    backgroundStyle: 'toolbarButtonBackgroundStyle',
    foregroundStyle: 'toolbarTranslateButtonForegroundStyle',
    action: {
      runScript: '快捷翻译',
    },
  },
  toolbarTranslateButtonForegroundStyle: makeToolbarTextStyle('翻译'),

  toolbarEmojiButton: {
    backgroundStyle: 'toolbarButtonBackgroundStyle',
    foregroundStyle: 'toolbarEmojiButtonForegroundStyle',
    action: {
      keyboardType: 'emojis', # 调用内置键盘
    },
  },
  toolbarEmojiButtonForegroundStyle: makeToolbarTextStyle('表情'),

  toolbarPhraseeButton: {
    backgroundStyle: 'toolbarButtonBackgroundStyle',
    foregroundStyle: 'toolbarPhraseeButtonForegroundStyle',
    action: { shortcut: '#showPhraseView' },
  },
  toolbarPhraseeButtonForegroundStyle: makeToolbarTextStyle('短语'),

  toolbarPasteboardButton: {
    backgroundStyle: 'toolbarButtonBackgroundStyle',
    foregroundStyle: 'toolbarPasteboardButtonForegroundStyle',
    action: {
      shortcut: '#showPasteboardView',
    },
  },
  toolbarPasteboardButtonForegroundStyle: makeToolbarTextStyle('剪切'),

  toolbarScriptButton: {
    backgroundStyle: 'toolbarButtonBackgroundStyle',
    foregroundStyle: 'toolbarScriptButtonForegroundStyle',
    action: {
      shortcut: '#toggleScriptView',
    },
  },
  toolbarScriptButtonForegroundStyle: makeToolbarTextStyle('脚本'),

  toolbarSimp2tranButton: {
    backgroundStyle: 'toolbarButtonBackgroundStyle',
    foregroundStyle: [
      {
        styleName: 'tranStyle',
        conditionKey: 'rime$simplification',
        conditionValue: true,
      },
      {
        styleName: 'simpStyle',
        conditionKey: 'rime$simplification',
        conditionValue: false,
      },
    ],
    action: {
      shortcut: '#简繁切换',
    },
  },
  simpStyle: makeToolbarTextStyle('简繁'),
  tranStyle: makeToolbarTextStyle('简繁'),

  toolbarCloseButton: {
    backgroundStyle: 'toolbarButtonBackgroundStyle',
    foregroundStyle: 'toolbarCloseButtonForegroundStyle',
    action: 'dismissKeyboard',
  },
  toolbarCloseButtonForegroundStyle: makeToolbarTextStyle('收起'),

  // 横向候选样式
  horizontalCandidatesStyle: {
    insets: {
      top: 5,
      left: 5,
    },
    backgroundStyle: 'toolbarBackgroundStyle',
  },
  // 横向候选布局
  horizontalCandidatesLayout: [
    {
      HStack: {
        subviews: [
          { Cell: 'horizontalCandidates' },
          { Cell: 'expandButton' },
        ],
      },
    },
  ],
  // 横向候选文字
  horizontalCandidates: {
    type: 'horizontalCandidates',
    size: { width: '7/8' },
    maxColums: 7,
    insets: { left: 3 },
    // backgroundStyle:
    candidateStyle: 'candidateStyle',
  },
  // 横向候选展开按键定义
  expandButton: {
    backgroundStyle: 'toolbarButtonBackgroundStyle',
    foregroundStyle: 'expandButtonForegroundStyle',
    action: { shortcut: '#candidatesBarStateToggle' },
  },

  expandButtonForegroundStyle: {
    buttonStyleType: 'fileImage',
    insets: { left: -5, right: -5, top: -5, bottom: -5 },
    contentMode: 'scaleAspectFit',
    normalImage: {
      file: 'cand',
      image: 'IMG3',
    },
    highlightImage: {
      file: 'cand2',
      image: 'IMG3',
    },
    // center: center['toolbar按键偏移'],
  },

  // 候选长按菜单
  candidateContextMenu: [
    {
      name: "📌 Pin",
      action: { sendKeys: "Control+t" }
    }
  ],

  // 横向候选文字样式
  candidateStyle: {
    highlightBackgroundColor: 0,
    preferredBackgroundColor: 'ffffff00',
    preferredIndexColor: color[theme]['候选字体选中字体颜色'],
    preferredTextColor: color[theme]['候选字体选中字体颜色'],
    preferredCommentColor: color[theme]['候选字体选中字体颜色'],
    indexColor: color[theme]['候选字体未选中字体颜色'],
    textColor: color[theme]['候选字体未选中字体颜色'],
    commentColor: color[theme]['候选字体未选中字体颜色'],
    indexFontSize: fontSize['未展开候选字体选中字体大小'],
    textFontSize: fontSize['未展开候选字体选中字体大小'],
    commentFontSize: fontSize['未展开comment字体大小'],
  },

  // 纵向候选定义
  verticalCandidatesStyle: {
    insets: { left: 3, bottom: 1, top: 3 },
    backgroundStyle: 'verticalCandidateBackgroundStyle',
  },
  // 纵向候选背景
  verticalCandidateBackgroundStyle: {
    buttonStyleType: 'fileImage',
    normalImage: {
      file: 'bg',
      image: 'IMG3',
    },
  },
  // 纵向候选布局
  verticalCandidatesLayout: [
    {
      HStack: {
        subviews: [
          { Cell: 'verticalCandidates' },
        ],
      },
    },
    {
      HStack: {
        style: 'HStackStyle',
        subviews: [
          { Cell: 'verticalCandidatePageUpButton' },
          { Cell: 'verticalCandidatePageDownButton' },
          { Cell: 'verticalCandidateReturnButton' },
          { Cell: 'verticalCandidateBackspaceButton' },
        ],
      },
    },
  ],
  HStackStyle: {
    size: {
      height: '1/5',
    },
  },
  // 纵向候选配置
  verticalCandidates: {
    type: 'verticalCandidates',
    insets: {
      top: 3,
      bottom: 3,
      left: 4,
      right: 4,
    },
    // （非必须，默认值为 4）显示区域内候选文字最大行数
    // maxRows: 4
    // （非必须，默认值为 5）显示区域内候选文字最大列数
    // maxColumns: 5
    // bottomRowHeight: 50,
    backgroundStyle: 'verticalCandidateBackgroundStyle',
    candidateStyle: 'verticalCandidateCellStyle',
  },

  // 纵向候选文字样式
  verticalCandidateCellStyle: {
    insets: {
      top: 8,
      bottom: 8,
      left: 8,
      right: 8,
    },
    highlightBackgroundColor: 0,
    preferredBackgroundColor: 'ffffff00',
    preferredIndexColor: color[theme]['候选字体选中字体颜色'],
    preferredTextColor: color[theme]['候选字体选中字体颜色'],
    preferredCommentColor: color[theme]['候选字体选中字体颜色'],
    indexColor: color[theme]['长按非选中字体颜色'],
    textColor: color[theme]['长按非选中字体颜色'],
    commentColor: color[theme]['长按非选中字体颜色'],
    indexFontSize: fontSize['展开候选字体选中字体大小'],
    textFontSize: fontSize['展开候选字体选中字体大小'],
    commentFontSize: fontSize['未展开候选字体选中字体大小'],
  },

  // 纵向候选页面，按键背景样式，除了退格键
  verticalCandidateButtonBackgroundStyle: utils.makeImageStyle({
    normalImage: {
      file: 'anjian123',
      image: 'IMG16',
    },
    highlightImage: {
      file: 'anjian123ax',
      image: 'IMG16',
    },
  }),

  // 纵向候选页面，向上翻页按键
  verticalCandidatePageUpButton: {
    backgroundStyle: 'verticalCandidateButtonBackgroundStyle',
    foregroundStyle: 'verticalCandidatePageUpButtonForegroundStyle',
    action: { shortcut: '#verticalCandidatesPageUp' },
  },
  // 纵向候选页面，向下翻页按键
  verticalCandidatePageDownButton: {
    backgroundStyle: 'verticalCandidateButtonBackgroundStyle',
    foregroundStyle: 'verticalCandidatePageDownButtonForegroundStyle',
    action: { shortcut: '#verticalCandidatesPageDown' },
  },

  verticalCandidatePageUpButtonForegroundStyle: {
    contentMode: 'center',
    buttonStyleType: 'fileImage',
    normalImage: {
      file: 'sym',
      image: 'IMG2',
    },
    highlightImage: {
      file: 'sym2',
      image: 'IMG2',
    },
  },
  verticalCandidatePageDownButtonForegroundStyle: {
    buttonStyleType: 'fileImage',
    contentMode: 'center',
    normalImage: {
      file: 'sym',
      image: 'IMG3',
    },
    highlightImage: {
      file: 'sym2',
      image: 'IMG3',
    },
  },
  // 纵向候选页面，返回按键
  verticalCandidateReturnButton: {
    backgroundStyle: 'verticalCandidateButtonBackgroundStyle',
    foregroundStyle: 'verticalCandidateReturnButtonForegroundStyle',
    action: { shortcut: '#candidatesBarStateToggle' },
  },
  verticalCandidateReturnButtonForegroundStyle: {
    buttonStyleType: 'fileImage',
    contentMode: 'center',
    normalImage: {
      file: 'letter1',
      image: 'IMG73',
    },
    highlightImage: {
      file: 'letter1ax',
      image: 'IMG73',
    },
  },
  verticalCandidateBackspaceButton: {
    backgroundStyle: 'verticalCandidateBackspaceButtonBackgroundStyle',
    foregroundStyle: 'backspaceButtonForegroundStyle',
    action: 'backspace',
  },
  // 纵向候选页面，退格按键
  verticalCandidateBackspaceButtonBackgroundStyle: {
    buttonStyleType: 'fileImage',
    normalImage: {
      file: 'anjian',
      image: 'IMG9',
    },
    highlightImage: {
      file: 'anjian',
      image: 'IMG10',
    },
  },
  verticalCandidateBackspaceButtonforegroundStyle: {
    buttonStyleType: 'fileImage',
    contentMode: 'center',
    normalImage: {
      file: 'sym',
      image: 'IMG10',
    },
    highlightImage: {
      file: 'sym2',
      image: 'IMG10',
    },
  },
};

{
  getToolBar: getToolBar,
}
