import './util/helper/page'
import './util/helper/component'
import { ui } from '@util'
import { mineStore } from '@store'

App({

  onLaunch() {
    this.reporter()
  },

  onShow() {
    this.checkUpdateManager()
  },

  reporter() {
    const LOGGER = wx.getRealtimeLogManager() // 实时日志管理器实例
    wx.onPageNotFound(({ path, query, isEntryPage }) => LOGGER.warn(`onPageNotFound: target:${path},query:${JSON.stringify(query)},isFirstEntry:${isEntryPage}`))
    wx.onError(error => LOGGER.error(`onError: ${error}`))
    wx.onMemoryWarning(() => {
      const { model, system } = ui.getSystemInfo()
      const { id, nickname } = mineStore.data
      LOGGER.warn(`onMemoryWarning: model:${model}, system:${system}, userId: ${id}, nickname:${nickname}`)
    })
  },

  // 新版本提示
  checkUpdateManager() {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(() => updateManager.applyUpdate())
  },

})
